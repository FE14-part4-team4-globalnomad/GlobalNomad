"use client";
import TextField from "@mui/material/TextField";
import {
  LocalizationProvider,
  DatePicker as MUIDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import MinusIcon from "./(buttonicon)/minus_button.svg";
import PlusIcon from "./(buttonicon)/plus_button.svg";
import AddressSearchScriptLoader from "./(components)/AddressSearchScriptLoader";
import CustomInput from "./(components)/CustomInput";
import CustomTextarea from "./(components)/CustomTextarea";
import TimeSelectDropdown from "./(components)/TimeDropdown";
import UpdateWarningModal from "./(components)/UpdateWarningModal";
import {
  useGetActivityById,
  usePostActivityImage,
} from "./(components)/usePostActivityImage";
import activityService from "@/apis/activity/activity.service";
import myActivityService from "@/apis/myActivity/myActivity.service";
import CalendarIcon from "@/assets/icons/any/calendar/icon_calendar_black.svg";
import CloseEye from "@/assets/icons/any/icon_close_eye.svg";
import BackIcon from "@/assets/icons/arrow/icon_arrow_back.svg";
import Button from "@/components/button/Button";
import DefaultDropdown from "@/components/dropdown/DefaultDropdown";
import ConfirmModal from "@/components/modal/ConfirmModal";
import { useOverlay } from "@/hooks/useOverlay";
import { ActivityCategoryType } from "@/types/activity";

interface DaumPostcodeData {
  address: string;
}

declare global {
  interface Window {
    daum: {
      Postcode: new (config: {
        oncomplete: (data: DaumPostcodeData) => void;
      }) => { open(): void };
    };
  }
}

const CATEGORY_OPTIONS = [
  { id: 1, title: "문화 예술", value: "문화 · 예술" },
  { id: 2, title: "식음료", value: "식음료" },
  { id: 3, title: "스포츠", value: "스포츠" },
  { id: 4, title: "투어", value: "투어" },
  { id: 5, title: "관광", value: "관광" },
  { id: 6, title: "웰빙", value: "웰빙" },
];

function ActivityUpdatePage() {
  const { id } = useParams();
  const router = useRouter();
  const isNew = id === "new";
  const setBannerImage = useState<File | null>(null)[1];
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [initialState, setInitialState] = useState<string>("");
  const [introImages, setIntroImages] = useState<File[]>([]);
  const [introImageUrls, setIntroImageUrls] = useState<string[]>([]);
  const { overlay, close } = useOverlay();

  useEffect(() => {
    const handler = () => {
      console.log("🔥 popstate fired");
      if (!isDirty) {
        console.log("📭 isDirty is false");
        return;
      }
      window.history.pushState(null, "", window.location.href);
      overlay(
        <UpdateWarningModal
          message="작성 중인 내용을 저장하지 않았습니다. 이동하시겠습니까?"
          onConfirm={() => {
            console.log("✅ 이동 허용");
            setIsDirty(false);
            close();
            router.back();
          }}
        />,
      );
    };

    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [isDirty, overlay, close, router]);

  const handleAddressClick = () => {
    new window.daum.Postcode({
      oncomplete: function (data: { address: string }) {
        const fullAddress = data.address;
        setFormData((prev) => ({ ...prev, address: fullAddress }));
      },
    }).open();
  };

  const { mutateAsync: postImage } = usePostActivityImage();

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await postImage(file);
    setBannerImage(file);
    setBannerImageUrl(url);
  };

  const handleIntroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || introImages.length >= 4) return;

    const file = files[0];
    const url = await postImage(file);

    setIntroImages((prev) => [...prev, file]);
    setIntroImageUrls((prev) => [...prev, url]);
  };

  const removeIntroImage = (index: number) => {
    setIntroImages((prev) => prev.filter((_, i) => i !== index));
    setIntroImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const removeBannerImage = () => {
    setBannerImage(null);
    setBannerImageUrl(null);
  };

  const [formData, setFormData] = useState<{
    title: string;
    category: ActivityCategoryType | "";
    description: string;
    price: string;
    address: string;
  }>({
    title: "",
    category: "",
    description: "",
    price: "",
    address: "",
  });
  const filteredCategoryOptions = CATEGORY_OPTIONS;

  // 예약 가능한 시간대
  const [availableTimes, setAvailableTimes] = useState<
    { id?: number; date: Date | null; startTime: string; endTime: string }[]
  >([]);

  // 입력용 temp 상태
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [tempStart, setTempStart] = useState("");
  const [tempEnd, setTempEnd] = useState("");

  function CustomCalendarIcon() {
    return <Image src={CalendarIcon} alt="calendar" width={20} height={20} />;
  }

  const { data: activity } = useGetActivityById(Number(id));

  useEffect(() => {
    if (isNew) {
      const initialPayload = {
        title: "",
        category: "",
        description: "",
        price: "",
        address: "",
        availableTimes: [],
        bannerImageUrl: null,
        subImages: [],
      };
      setInitialState(JSON.stringify(initialPayload));
      return;
    }

    if (!activity) return;

    setFormData({
      title: activity.title,
      category: activity.category,
      description: activity.description,
      price: activity.price.toString(),
      address: activity.address,
    });

    setBannerImageUrl(activity.bannerImageUrl);

    setIntroImageUrls(
      activity.subImages?.map((img: { imageUrl: string }) => img.imageUrl),
    );

    const parsedTimes =
      activity.schedules?.map((s) => ({
        id: s.id,
        date: parseISO(s.date),
        startTime: s.startTime,
        endTime: s.endTime,
      })) ?? [];

    setAvailableTimes(parsedTimes);

    const initialPayload = {
      title: activity.title,
      category: activity.category,
      description: activity.description,
      price: activity.price.toString(),
      address: activity.address,
      availableTimes: parsedTimes,
      bannerImageUrl: activity.bannerImageUrl,
      subImages: activity.subImages?.map((img) => img.imageUrl) ?? [],
    };

    setInitialState(JSON.stringify(initialPayload));
  }, [id, isNew, activity]);

  useEffect(() => {
    if (!initialState) return;

    const current = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      price: formData.price,
      address: formData.address,
      availableTimes,
      bannerImageUrl,
      subImages: introImageUrls,
    };

    setIsDirty(JSON.stringify(current) !== initialState);
  }, [formData, availableTimes, bannerImageUrl, introImageUrls, initialState]);

  const handleAddTime = () => {
    if (!tempDate) {
      alert("날짜를 선택해주세요.");
      return;
    }
    if (!tempStart) {
      alert("시작 시간을 선택해주세요.");
      return;
    }
    if (!tempEnd) {
      alert("종료 시간을 선택해주세요.");
      return;
    }

    const isDuplicate = availableTimes.some(
      (slot) =>
        slot.date?.toDateString() === tempDate.toDateString() &&
        slot.startTime === tempStart &&
        slot.endTime === tempEnd,
    );

    if (isDuplicate) {
      alert("같은 시간대에는 1개의 체험만 생성할 수 있습니다.");
      return;
    }

    setAvailableTimes((prev) => [
      ...prev,
      { date: tempDate, startTime: tempStart, endTime: tempEnd },
    ]);

    // 필드 초기화
    setTempDate(null);
    setTempStart("");
    setTempEnd("");
  };

  const [scheduleIdsToRemove, setScheduleIdsToRemove] = useState<number[]>([]);

  const handleRemoveTime = (index: number) => {
    setAvailableTimes((prev) => {
      const target = prev[index];

      // 삭제 대상이 서버에서 온 예약시간(id 있음)일 경우 추적
      if (target.id) {
        setScheduleIdsToRemove((ids) => [...ids, target.id!]);
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async () => {
    if (formData.category === "") {
      alert("카테고리를 선택해주세요.");
      return;
    }

    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        price: Number(formData.price),
        address: formData.address,
        bannerImageUrl: bannerImageUrl ?? "",
        subImageUrlsToAdd: introImageUrls,
        subImageIdsToRemove: [],
        scheduleIdsToRemove: scheduleIdsToRemove,
        schedulesToAdd: availableTimes.map((slot) => ({
          id: 0,
          date: slot.date ? format(slot.date, "yyyy-MM-dd") : "",
          startTime: slot.startTime,
          endTime: slot.endTime,
        })),
      };

      if (isNew) {
        await activityService.postActivity({ payload });
      } else {
        await myActivityService.patchMyActivity({
          activityId: Number(id),
          payload,
        });
      }

      overlay(
        <ConfirmModal
          message={isNew ? "등록이 완료되었습니다" : "수정이 완료되었습니다"}
          onConfirm={() => {
            close();
            router.push("/experience");
          }}
        />,
      );
    } catch (err) {
      console.error("❌ 제출 실패:", err);
    }
  };

  const isFormValid =
    Object.values(formData).every((field) => field.trim() !== "") &&
    availableTimes.length &&
    !!bannerImageUrl;

  useEffect(() => {
    console.log("변경사항 있음?", isDirty);
  }, [isDirty]);

  return (
    <div className="relative desktop:w-[70rem] tablet:w-[68.8rem] mobile:w-[32.7rem] ">
      <AddressSearchScriptLoader />
      <div className="absolute top-0 right-0 ">
        <button
          onClick={() => {
            if (!isDirty) {
              router.back(); // 변경사항 없으면 바로 이동
              return;
            }
            overlay(
              <UpdateWarningModal
                message={`저장되지 않았습니다.\n정말 뒤로 가시겠습니까?`}
                onConfirm={() => {
                  close();
                  router.back();
                }}
              />,
            );
          }}
          className="w-4 h-4 bg-white border border-gray-300 rounded-full flex items-center justify-center"
        >
          <Image src={BackIcon} alt="뒤로가기" width={16} height={16} />
        </button>
      </div>
      <h1 className="text-gray-950 text-18-b">
        {isNew ? "내 체험 등록하기" : "내 체험 수정하기"}
      </h1>
      <CustomInput
        label="제목"
        placeholder="제목을 입력해 주세요"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <div className="mt-[2.4rem]">
        <DefaultDropdown
          label="카테고리"
          placeholder="카테고리를 선택하세요"
          selectedItem={
            CATEGORY_OPTIONS.find((opt) => opt.value === formData.category) ||
            undefined
          }
          optionList={filteredCategoryOptions}
          onSelect={(selected) => {
            setFormData({
              ...formData,
              category: selected.value as ActivityCategoryType,
            });
          }}
        />
      </div>

      <CustomTextarea
        label="설명"
        placeholder="체험에 대한 설명을 입력해 주세요"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      <CustomInput
        label="가격"
        placeholder="체험 금액을 입력해 주세요"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
      />

      <CustomInput
        label="주소"
        placeholder="주소를 입력해 주세요"
        value={formData.address}
        onClick={handleAddressClick}
        readOnly
      />

      {/* 예약 가능 시간대 입력 줄 */}
      <div className="text-16-b text-gray-950 mt-6 mb-[1.8rem]">
        <label>예약 가능한 날짜</label>
      </div>
      <div
        className="grid gap-[1.4rem] border-b border-gray-100 pb-[2rem]
  tablet:grid-cols-[36rem_27rem_auto]
  mobile:grid-cols-1"
      >
        {/* 날짜 */}
        <div className="flex flex-col">
          <label className="tablet:text-16-m text-14-m text-gray-950 mb-[1rem]">
            날짜
          </label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MUIDatePicker
              value={tempDate}
              onChange={(newValue) => setTempDate(newValue)}
              format="yy/MM/dd"
              enableAccessibleFieldDOMStructure={false}
              slots={{
                openPickerIcon: CustomCalendarIcon,
                textField: (params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    className="w-full"
                    InputProps={{
                      ...params.InputProps,
                      className:
                        "h-[5.4rem] border border-gray-100 !rounded-[1.6rem] !text-16-m",
                    }}
                  />
                ),
              }}
            />
          </LocalizationProvider>
        </div>

        {/* 시간 + 버튼 묶음 */}
        <div className="flex flex-col">
          <div className="grid tablet:grid-cols-[1fr_auto_1fr_auto] mobile:grid-cols-[1fr_auto_1fr_auto] items-end gap-[0.5rem]">
            {/* 시작 시간 */}
            <div className="flex flex-col">
              <label className="text-16-m text-gray-950 mb-[1rem] hidden tablet:block">
                시작 시간
              </label>
              <TimeSelectDropdown value={tempStart} onChange={setTempStart} />
            </div>

            {/* 구분 기호 */}
            <div className="flex items-end pb-[1.9rem]">
              <p className="text-center w-[2.8rem]">-</p>
            </div>

            {/* 종료 시간 */}
            <div className="flex flex-col">
              <label className="text-16-m text-gray-950 mb-[1rem] hidden tablet:block">
                종료 시간
              </label>
              <TimeSelectDropdown value={tempEnd} onChange={setTempEnd} />
            </div>

            {/* + 버튼 */}
            <div className="flex items-end pb-[0.6rem]">
              <div className="relative w-[4.2rem] h-[4.2rem]">
                <Image
                  src={PlusIcon}
                  alt="추가"
                  fill
                  onClick={handleAddTime}
                  className="cursor-pointer border border-blue-400 rounded-lg hover:bg-blue-50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 추가된 시간대 리스트 */}
      <div className="mt-4 flex flex-col gap-2 mb-[3rem]">
        {availableTimes.map((slot, index) => (
          <div
            key={index}
            className="grid gap-[1.4rem]
      tablet:grid-cols-[36rem_27rem_auto]
      mobile:grid-cols-1"
          >
            {/* 날짜 (TextField 스타일로) */}
            <div className="h-[5.4rem] border border-gray-100 rounded-[1.6rem] px-[2rem] py-[1.6rem] text-16-m text-gray-950 flex items-center w-full">
              {slot.date ? format(slot.date, "yy/MM/dd") : ""}
            </div>

            {/* 시간 + 버튼 묶음 */}
            <div className="grid mobile:grid-cols-[1fr_auto_1fr_auto] tablet:grid-cols-[1fr_auto_1fr_auto] items-end gap-[0.5rem]">
              {/* 시작 시간 */}
              <TimeSelectDropdown
                value={slot.startTime}
                onChange={(newStartTime) => {
                  const newTimes = [...availableTimes];
                  newTimes[index].startTime = newStartTime;
                  setAvailableTimes(newTimes);
                }}
              />

              {/* 구분 기호 */}
              <div className="flex items-end pb-[1.9rem]">
                <p className="text-center w-[2.8rem]">-</p>
              </div>

              {/* 종료 시간 */}
              <TimeSelectDropdown
                value={slot.endTime}
                onChange={(newEndTime) => {
                  const newTimes = [...availableTimes];
                  newTimes[index].endTime = newEndTime;
                  setAvailableTimes(newTimes);
                }}
              />

              {/* 삭제 버튼 */}
              <div className="flex items-end pb-[0.6rem] justify-center">
                <div className="relative w-[4.2rem] h-[4.2rem]">
                  <Image
                    src={MinusIcon}
                    alt="삭제"
                    fill
                    onClick={() => handleRemoveTime(index)}
                    className="cursor-pointer bg-gray-200 rounded-full hover:bg-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <label className="block text-16-m font-semibold mb-2">
        배너 이미지 등록
      </label>
      <div className="flex gap-2 items-center mb-[2.4rem]">
        {/* 업로드 버튼은 항상 있음 */}
        <label className="cursor-pointer desktop:w-[12.8rem] desktop:h-[12.8rem] tablet:h-[12.6rem] tablet:w-[12.6rem] w-8 h-8 border border-gray-100 rounded-[1.6rem] flex items-center justify-center">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBannerUpload}
            disabled={!!bannerImageUrl}
          />
          <div className="flex flex-col items-center gap-[1rem]">
            <div className="relative w-[2.7rem] h-[2.3rem]">
              <Image src={CloseEye} alt="이미지 업로드" fill />
            </div>
            <span className="text-gray-600 tablet:text-14-m text-13-m">
              {bannerImageUrl ? "1/1" : "0/1"}
            </span>
          </div>
        </label>

        {bannerImageUrl && (
          <div className="relative ">
            <div className="relative desktop:w-[12.8rem] desktop:h-[12.8rem] tablet:h-[12.6rem] tablet:w-[12.6rem] w-8 h-8 rounded-[1.6rem] overflow-hidden">
              <Image src={bannerImageUrl} alt="소개 이미지" fill />
            </div>
            <button
              className="absolute -top-[0.4rem] -right-[0.4rem] bg-black bg-opacity-60 text-white rounded-full tablet:w-[2.6rem] tablet:h-[2.6rem] h-[2rem] w-[2rem] flex justify-center items-center"
              onClick={removeBannerImage}
            >
              ×
            </button>
          </div>
        )}
      </div>
      <label className="block text-16-m font-semibold mt-[3rem] mb-[1rem]">
        소개 이미지 등록
      </label>
      <div className="overflow-x-auto pr-[2.6rem] pt-[1rem] -mt-[1rem]">
        <div className="flex gap-[1.4rem] mb-[2.4rem] whitespace-nowrap relative">
          <label
            className={`grid grid-col flex-none cursor-pointer border-gray-100 desktop:w-[12.8rem] desktop:h-[12.8rem] tablet:h-[12.6rem] tablet:w-[12.6rem] w-8 h-8 border rounded-[1.6rem] flex items-center justify-center ${
              introImages.length >= 4 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleIntroUpload}
              disabled={introImages.length >= 4}
            />
            <div className="flex flex-col items-center gap-[1rem]">
              <div className="relative w-[2.7rem] h-[2.3rem]">
                <Image src={CloseEye} alt="이미지 업로드" fill />
              </div>
              <span className="text-gray-600 tablet:text-14-m text-13-m">
                {introImages.length}/4
              </span>
            </div>
          </label>

          {introImageUrls.map((url, index) => (
            <div key={index} className="relative flex-none">
              <div className="relative desktop:w-[12.8rem] desktop:h-[12.8rem] tablet:h-[12.6rem] tablet:w-[12.6rem] w-8 h-8 rounded-[1.6rem] overflow-hidden">
                <Image src={url} alt="소개 이미지" fill />
              </div>
              <button
                className="absolute flex justify-center items-center -top-[0.4rem] -right-[0.4rem] bg-black bg-opacity-60 text-white rounded-full tablet:w-[2.6rem] tablet:h-[2.6rem] h-2 w-2 z-10"
                onClick={() => removeIntroImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          size="experienceRegister2"
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          {isNew ? "등록하기" : "수정하기"}
        </Button>
      </div>
    </div>
  );
}

export default ActivityUpdatePage;
