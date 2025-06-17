"use client";
import TextField from "@mui/material/TextField";
import {
  LocalizationProvider,
  DatePicker as MUIDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { format } from "date-fns";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import MinusIcon from "./(buttonicon)/minus_button.svg";
import PlusIcon from "./(buttonicon)/plus_button.svg";
import AddressSearchScriptLoader from "./(components)/AddressSearchScriptLoader";
import CustomInput from "./(components)/CustomInput";
import CustomTextarea from "./(components)/CustomTextarea";
import TimeSelectDropdown from "./(components)/TimeDropdown";
import CalendarIcon from "@/assets/icons/any/calendar/icon_calendar_black.svg";
import Button from "@/components/button/Button";
import DefaultDropdown from "@/components/dropdown/DefaultDropdown";

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
  { id: 1, title: "문화 예술" },
  { id: 2, title: "식음료" },
  { id: 3, title: "스포츠" },
  { id: 4, title: "투어" },
  { id: 5, title: "관광" },
  { id: 6, title: "웰빙" },
];

function ActivityUpdatePage() {
  const { id } = useParams();
  const router = useRouter();
  const isNew = id === "new";
  const setBannerImage = useState<File | null>(null)[1];
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(null);

  const [introImages, setIntroImages] = useState<File[]>([]);
  const [introImageUrls, setIntroImageUrls] = useState<string[]>([]);

  const handleAddressClick = () => {
    new window.daum.Postcode({
      oncomplete: function (data: { address: string }) {
        const fullAddress = data.address;
        setFormData((prev) => ({ ...prev, address: fullAddress }));
      },
    }).open();
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/activities/image`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: false,
      },
    );

    return res.data.activityImageUrl;
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await uploadImage(file);
    setBannerImage(file);
    setBannerImageUrl(url);
  };

  const handleIntroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || introImages.length >= 4) return;

    const file = files[0];
    const url = await uploadImage(file);

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

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    address: "",
  });

  const filteredCategoryOptions = CATEGORY_OPTIONS;

  // 예약 가능한 시간대
  const [availableTimes, setAvailableTimes] = useState<
    { date: Date | null; startTime: string; endTime: string }[]
  >([]);

  // 입력용 temp 상태
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [tempStart, setTempStart] = useState("");
  const [tempEnd, setTempEnd] = useState("");

  function CustomCalendarIcon() {
    return <Image src={CalendarIcon} alt="calendar" width={20} height={20} />;
  }

  useEffect(() => {
    if (!isNew) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/activities/${id}`, {
          withCredentials: true,
        })
        .then((res) => setFormData(res.data))
        .catch((err) => console.error("불러오기 실패:", err));
    }
  }, [id, isNew]);

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

  const handleRemoveTime = (index: number) => {
    setAvailableTimes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        availableTimes, // 예약 가능한 시간대 포함
      };

      if (isNew) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/activities`,
          payload,
          {
            withCredentials: true,
          },
        );
      } else {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/activities/${id}`,
          payload,
          { withCredentials: true },
        );
      }
      router.push("/experience");
    } catch (err) {
      console.error("제출 실패:", err);
    }
  };

  return (
    <div className="desktop:w-[70rem] tablet:w-[68.4rem] mobile:w-[32.7rem] ">
      <AddressSearchScriptLoader />
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
            CATEGORY_OPTIONS.find((opt) => opt.title === formData.category) ||
            undefined
          }
          optionList={filteredCategoryOptions}
          onSelect={(selected) => {
            setFormData({ ...formData, category: selected.title });
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
        onChange={() => {}}
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
          <label className="text-16-m text-gray-950 mb-[1rem]">날짜</label>
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
              <label className="text-16-m text-gray-950 mb-[1rem]">
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
              <label className="text-16-m text-gray-950 mb-[1rem]">
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

      {/* 배너 이미지 */}
      <label className="block text-16-m font-semibold mb-2">
        배너 이미지 등록
      </label>
      <div className="flex gap-2 items-center">
        {bannerImageUrl ? (
          <div className="relative w-[12.8rem] h-[12.8rem] rounded-[1.6rem] border-gray-100 overflow-hidden">
            <Image
              src={bannerImageUrl}
              alt="배너 이미지 등록"
              width={128}
              height={128}
            />
            <button
              className="absolute top-0 right-0 bg-black bg-opacity-60 text-white rounded-full w-6 h-6"
              onClick={removeBannerImage}
            >
              ×
            </button>
          </div>
        ) : (
          <label className="cursor-pointer w-[12.8rem] h-[12.8rem] border-gray-100 border rounded-[1.6rem] flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBannerUpload}
            />
            <span className="text-gray-600 text-14-m">0/1</span>
          </label>
        )}
      </div>

      {/* 소개 이미지 */}
      <label className="block text-16-m font-semibold mt-[3rem] mb-[1rem]">
        소개 이미지 등록
      </label>
      <div className="flex gap-2 flex-wrap mb-[2.4rem]">
        {introImageUrls.map((url, index) => (
          <div
            key={index}
            className="relative w-[12.8rem] h-[12.8rem] rounded-[1.6rem]  overflow-hidden"
          >
            <Image src={url} alt="소개 이미지" fill />
            <button
              className="absolute top-0 right-0 bg-black bg-opacity-60 text-white rounded-full w-6 h-6"
              onClick={() => removeIntroImage(index)}
            >
              ×
            </button>
          </div>
        ))}

        {introImages.length < 4 && (
          <label className="cursor-pointer border-gray-100 w-[12.8rem] h-[12.8rem] border rounded-[1.6rem] flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleIntroUpload}
            />
            <span className="text-gray-600 text-14-m">
              {introImages.length}/4
            </span>
          </label>
        )}
      </div>

      <div className="flex justify-center">
        <Button size="experienceRegister2" onClick={handleSubmit}>
          {isNew ? "등록하기" : "수정하기"}
        </Button>
      </div>
    </div>
  );
}

export default ActivityUpdatePage;
