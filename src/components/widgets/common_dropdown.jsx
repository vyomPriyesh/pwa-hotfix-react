import React, { useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../components/ui/command";
import { Check, ChevronDown, ChevronsUpDown } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover";
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

const CommonDropdown = ({ value, placeholder, options, onSelect, error ,disabled}) => {

    const [open, setOpen] = useState(false)

    const handleChange = (currentValue) => {
        onSelect(currentValue === value ? "" : currentValue)
        setOpen(false)
    }

    return (
        <div className="">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        disabled={disabled}
                        aria-expanded={open}
                        className="justify-between w-full"
                    >
                        {value
                            ? options.find((framework) => framework.value === value)?.label
                            : <>{placeholder}</>}
                        <ChevronDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 lg:w-[367px] capitalize" align="start">
                    <Command>
                        <CommandInput placeholder="Search framework..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>Data Not Found</CommandEmpty>
                            <CommandGroup>
                                {options?.map((framework) => (
                                    <CommandItem
                                        key={framework.value}
                                        value={framework.value}
                                        onSelect={handleChange}
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
            </Popover>
        </div>

    )
}

export default CommonDropdown
