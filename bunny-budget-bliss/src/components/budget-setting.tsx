import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Target, Edit3 } from "lucide-react"
import { CuteButton } from "@/components/ui/cute-button"
import { CuteCard, CuteCardContent, CuteCardHeader, CuteCardTitle } from "@/components/ui/cute-card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { MascotDisplay } from "@/components/mascot-display"
import { SpeechBubble } from "@/components/ui/speech-bubble"
import { Budget } from "@/types/budget"
import { storageUtils } from "@/utils/storage"
import { formatCurrency } from "@/utils/budget-calculations"
import { useToast } from "@/hooks/use-toast"

const budgetSchema = z.object({
  monthlyLimit: z.string().min(1, "Budget amount is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Please enter a valid budget amount"
  )
})

type BudgetForm = z.infer<typeof budgetSchema>

interface BudgetSettingProps {
  budget: Budget | null
  onBudgetUpdated: (budget: Budget) => void
}

export function BudgetSetting({ budget, onBudgetUpdated }: BudgetSettingProps) {
  const [isEditing, setIsEditing] = useState(!budget)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  
  const form = useForm<BudgetForm>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      monthlyLimit: budget?.monthlyLimit.toString() || ""
    }
  })

  const onSubmit = async (data: BudgetForm) => {
    setIsSubmitting(true)
    
    try {
      const currentDate = new Date()
      const newBudget: Budget = {
        id: budget?.id || crypto.randomUUID(),
        monthlyLimit: Number(data.monthlyLimit),
        month: currentDate.toLocaleString('default', { month: 'long' }),
        year: currentDate.getFullYear()
      }

      storageUtils.saveBudget(newBudget)
      onBudgetUpdated(newBudget)
      setIsEditing(false)
      
      toast({
        title: "Budget set! 🎯",
        description: `Monthly budget: ${formatCurrency(newBudget.monthlyLimit)}`,
      })
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try setting your budget again",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isEditing && budget) {
    return (
      <CuteCard variant="gradient">
        <CuteCardContent className="text-center py-6">
          <div className="flex flex-col items-center space-y-4">
            <MascotDisplay type="bear" size="lg" />
            <SpeechBubble variant="bear" position="center">
              Your monthly budget is set to {formatCurrency(budget.monthlyLimit)}! 🎯
            </SpeechBubble>
            <CuteButton 
              variant="bear" 
              onClick={() => setIsEditing(true)}
              className="mt-4"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Update Budget
            </CuteButton>
          </div>
        </CuteCardContent>
      </CuteCard>
    )
  }

  return (
    <CuteCard variant="soft">
      <CuteCardHeader>
        <div className="flex items-center space-x-3">
          <MascotDisplay type="bear" size="md" />
          <div className="flex-1">
            <CuteCardTitle>
              {budget ? "Update Budget" : "Set Your Budget"}
            </CuteCardTitle>
            <SpeechBubble variant="bear" className="mt-2 text-xs">
              {budget 
                ? "Let's adjust your monthly spending goal! 🐻" 
                : "Let's set your monthly spending goal together! 🐻✨"
              }
            </SpeechBubble>
          </div>
        </div>
      </CuteCardHeader>
      
      <CuteCardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="monthlyLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Budget Limit</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₹
                      </span>
                      <Input 
                        type="number"
                        placeholder="5000"
                        className="rounded-full border-2 pl-8 text-lg font-medium"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-3 pt-4">
              <CuteButton 
                type="submit" 
                variant="bear" 
                size="lg" 
                className="flex-1"
                disabled={isSubmitting}
              >
                <Target className="w-4 h-4 mr-2" />
                {isSubmitting ? "Saving..." : budget ? "Update Goal 🐻" : "Set Goal 🐻"}
              </CuteButton>
              
              {budget && (
                <CuteButton 
                  type="button"
                  variant="ghost"
                  size="lg"
                  onClick={() => {
                    setIsEditing(false)
                    form.reset()
                  }}
                >
                  Cancel
                </CuteButton>
              )}
            </div>
          </form>
        </Form>
      </CuteCardContent>
    </CuteCard>
  )
}