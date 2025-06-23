import ModalWrapper from "./ModalWrapper";
import Button from "../button/Button";
import { useOverlay } from "@/hooks/useOverlay";

export default function ConfirmModal({ message = "", onConfirm = () => {} }) {
  const { close } = useOverlay();

  const onClose = () => {
    onConfirm();
    close();
  };

  return (
    <ModalWrapper className="p-[30px] pt-[34px] tablet:p-[40px] tablet:pb-[30px] max-w-screen tablet:max-w-[400px] gap-[16px] tablet:gap-[20px]">
      <div className="text-16-b tablet:text-18-b text-center overflow-clip break-all">
        {message.split("\n").map((line, idx) => (
          <p className="text-clip" key={`alert-message-${idx}`}>
            {line}
          </p>
        ))}
      </div>
      <div className="w-full flex justify-center">
        <Button size="modal" onClick={onClose}>
          확인
        </Button>
      </div>
    </ModalWrapper>
  );
}
