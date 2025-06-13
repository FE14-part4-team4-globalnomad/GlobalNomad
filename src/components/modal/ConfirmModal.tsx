import ModalWrapper from "./ModalWrapper";
import { useOverlay } from "@/hooks/useOverlay";

export default function ConfirmModal({ message = "", onConfirm = () => {} }) {
  const { close } = useOverlay();

  const onClose = () => {
    onConfirm();
    close();
  };

  return (
    <ModalWrapper className="p-[30px] pt-[34px] tablet:p-[40px] tablet:pb-[30px]">
      <div className="grid gap-[16px] tablet:gap-[20px]">
        <div className="text-16-b tablet:text-18-b text-center">
          {message.split("\n").map((line, idx) => (
            <p key={`alert-message-${idx}`}>{line}</p>
          ))}
        </div>
        <button onClick={onClose}>확인</button>
      </div>
    </ModalWrapper>
  );
}
