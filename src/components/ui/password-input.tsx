import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type PasswordInputProps = Omit<React.ComponentProps<"input">, "type"> & {
  type?: React.ComponentProps<"input">["type"]
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, disabled, type = "password", ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    const resolvedType = type === "password" ? (showPassword ? "text" : "password") : type

    return (
      <div className="relative">
        <Input
          ref={inputRef}
          type={resolvedType}
          className={cn("pr-10", className)}
          disabled={disabled}
          {...props}
        />

        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
          className="absolute inset-y-0 right-0 flex items-center justify-center rounded-r-lg px-3 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
        >
          {showPassword ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
