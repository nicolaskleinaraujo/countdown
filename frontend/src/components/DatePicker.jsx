// Components
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarIcon } from "lucide-react"

// Modules
import { format } from "date-fns"
import { ptBR } from "date-fns/locale/pt-BR"
import { cn } from "@/lib/utils"

const DatePicker = ({ date, setDate }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={ "outline" }
                    className={ cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground") }
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    { 
                        date ? format(date, "dd/MM/yy", {
                            locale: ptBR
                        }) : <span>Selecione uma data</span> 
                    }
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={ date }
                    onSelect={ setDate }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePicker
