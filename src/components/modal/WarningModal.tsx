import Image from "next/image";

import ModalWrapper from "./ModalWrapper";
import WarningImg from "@/assets/images/warning.svg";
import { useOverlay } from "@/hooks/useOverlay";

export default function WarningModal({
  message = "",
  confirmText = "네",
  onConfirm = () => {},
}) {
  const { close: onClose } = useOverlay();

  const onClickConfirm = () => {
    onConfirm();
    close();
  };

  return (
    <ModalWrapper className="p-[30px] pb-[24px] tablet:p-[30px] tablet:pb-[30px]">
      <div className="grid gap-[20px] tablet:gap-[24px]">
        <div className="grid gap-[2px]">
          <div className="" aria-label="image wrapper">
            <Image src={WarningImg} alt="얼럿 메세지창 이미지" fill />
          </div>
          <div className="text-16-b tablet:text-18-b">
            {message.split("\n").map((line, idx) => (
              <p key={`alert-message-${idx}`}>{line}</p>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center gap-[8px] tablet:gap-[12px]">
          <button onClick={onClose}>아니오</button>
          <button onClick={onClickConfirm}>{confirmText}</button>
        </div>
      </div>
    </ModalWrapper>
  );
}
