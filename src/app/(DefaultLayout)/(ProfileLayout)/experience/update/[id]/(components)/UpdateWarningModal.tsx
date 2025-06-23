import Image from "next/image";

import WarningImg from "@/assets/images/warning.svg?url";
import Button from "@/components/button/Button";
import ModalWrapper from "@/components/modal/ModalWrapper";
import { useOverlay } from "@/hooks/useOverlay";

export default function UpdateWarningModal({
  message = "",
  confirmText = "네",
  onConfirm = () => {},
}) {
  console.log("🚨 모달 렌더됨");

  const { close: onClose } = useOverlay();

  const onClickConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <ModalWrapper className="p-[30px] pb-[24px] tablet:p-[30px] tablet:pb-[30px] max-w-screen tablet:max-w-[480px] gap-[20px] tablet:gap-[24px]">
      <div className="grid gap-[2px]">
        <div
          className="relative h-[49px] tablet:h-[88px]"
          aria-label="image wrapper"
        >
          <Image
            className="absolute"
            src={WarningImg}
            alt="얼럿 메세지창 이미지"
            fill
          />
        </div>
        <div className="text-16-b tablet:text-18-b text-center overflow-clip break-all">
          {message.split("\n").map((line, idx) => (
            <p key={`alert-message-${idx}`}>{line}</p>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center gap-[8px] tablet:gap-[12px]">
        <Button size="modal" variant="outline" onClick={onClose}>
          아니오
        </Button>
        <Button size="modal" onClick={onClickConfirm}>
          {confirmText}
        </Button>
      </div>
    </ModalWrapper>
  );
}
