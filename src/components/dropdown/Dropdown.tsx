"use client";

import Image from "next/image";
import {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
  useEffect,
} from "react";

import IconChevron from "@/assets/icons/arrow/icon_alt arrow_down_black.svg";
import { cn } from "@/utils/classNames";

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

  // Close on outside click
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

function DropdownSelectedArea({
  placeholder,
  selected,
  disabled,
}: {
  placeholder: string;
  selected?: string;
  disabled: boolean;
}) {
  const { isOpen, toggle } = useDropdown();
  return (
    <button
      className={cn(
        "h-[54px] w-full border-gray-100 rounded-[16px] px-2 text-16-m",
        `border border-gray-100 ${disabled ? "" : "focus:border-brand-500"}`,
        !!selected ? "text-gray-950" : "text-gray-400",
        "flex justify-between items-center gap-[8px]",
      )}
      onClick={disabled ? undefined : toggle}
    >
      {selected || placeholder}
      <Image
        className={cn(isOpen ? "rotate-180" : "", disabled ? "opacity-50" : "")}
        src={IconChevron}
        width={24}
        height={24}
        alt="드롭다운 화살표 아이콘"
      />
    </button>
  );
}
Dropdown.Selected = DropdownSelectedArea;

function DropdownSelectModal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { isOpen } = useDropdown();
  return (
    <div id="dropdown-items-wrapper">
      {isOpen && (
        <div
          className={cn(
            "absolute w-full max-h-[243px] overflow-y-auto mt-2 rounded-[16px] bg-white shadow-lg z-50 border border-gray-100",
            className,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
Dropdown.SelectArea = DropdownSelectModal;

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
