import React, { useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../components/ui/command";
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

const frameworks = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "work",
    label: "Job Work",
  },
  {
    value: "tempo",
    label: "Tempo Driver",
  },
]

const RoleDialog = () => {
    const { t } = useTranslation("common");
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("");

    return (
      <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : <>{t("selectRolePlaceholder")}</>}
          <ChevronDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 lg:w-[367px]">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    )
}

export default RoleDialog
