"use client";

import Image from "next/image";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import IconChevron from "@/assets/icons/arrow/icon_alt arrow_down_black.svg";
import { cn, cond } from "@/utils/classNames";

interface DropdownContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context)
    throw new Error("Dropdown components must be used within <Dropdown />");
  return context;
}

export function Dropdown({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };
    document?.addEventListener("mousedown", handleClickOutside);
    return () => document?.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, toggle, close }}>
      <div className="text-16-m flex flex-col" ref={triggerRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

function DropdownLabel({ label }: { label?: string }) {
  return label && <label className="text-gray-950 mb-1">{label}</label>;
}
Dropdown.Label = DropdownLabel;

const SelectedVariants = {
  default: "default",
  "no-outline": "no-outline",
} as const;
function DropdownSelected({
  variant = "default",
  placeholder,
  selected,
  disabled = false,
}: {
  variant?: (typeof SelectedVariants)[keyof typeof SelectedVariants];
  placeholder?: string;
  selected?: string;
  disabled?: boolean;
}) {
  const { isOpen, toggle } = useDropdown();
  return (
    <button
      className={cn(
        "h-[54px] w-full border-gray-100 rounded-[16px] text-16-m",
        variant === SelectedVariants.default
          ? "px-2 border border-gray-100"
          : "px-1 pl-[1.4rem]",
        cond(!disabled, "focus:border-brand-500"),
        selected ? "text-gray-950" : "text-gray-400",
        "flex justify-between items-center",
      )}
      onClick={disabled ? undefined : toggle}
    >
      {selected || placeholder}
      <Image
        className={cn(cond(isOpen, "rotate-180"), cond(disabled, "opacity-50"))}
        src={IconChevron}
        width={24}
        height={24}
        alt="드롭다운 화살표 아이콘"
      />
    </button>
  );
}
Dropdown.Selected = DropdownSelected;

function DropdownSelectAreaModal({ children }: { children: ReactNode }) {
  const { isOpen } = useDropdown();
  return (
    <div id="dropdown-items-wrapper">
      {isOpen && (
        <div className="absolute z-10 left-0 right-0 max-h-[243px] overflow-y-auto mt-2 rounded-[16px] bg-white border border-gray-100">
          {children}
        </div>
      )}
    </div>
  );
}
Dropdown.SelectArea = DropdownSelectAreaModal;

function DropdownSelectItem({
  children,
  onSelect,
}: {
  children: ReactNode;
  onSelect?: () => void;
}) {
  const { close } = useDropdown();
  const handleClick = () => {
    onSelect?.();
    close();
  };
  return (
    <button
      onClick={handleClick}
      className="w-full h-[54px] px-2 text-14-m text-left hover:bg-brand-100"
    >
      {children}
    </button>
  );
}
Dropdown.Item = DropdownSelectItem;
