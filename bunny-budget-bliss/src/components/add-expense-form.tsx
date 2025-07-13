import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus } from "lucide-react"
import { CuteButton } from "@/components/ui/cute-button"
import { CuteCard, CuteCardContent, CuteCardHeader, CuteCardTitle } from "@/components/ui/cute-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { MascotDisplay } from "@/components/mascot-display"
import { SpeechBubble } from "@/components/ui/speech-bubble"
import { Expense, Category, categoryEmojis } from "@/types/budget"
import { storageUtils } from "@/utils/storage"
import { useToast } from "@/hooks/use-toast"

const expenseSchema = z.object({
  name: z.string().min(1, "Please name your expense"),
  amount: z.string().min(1, "Amount is required").refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Please enter a valid amount"
  ),
  category: z.string().min(1, "Please pick a category"),
  description: z.string().optional()
})

type ExpenseForm = z.infer<typeof expenseSchema>

interface AddExpenseFormProps {
  onExpenseAdded: (expense: Expense) => void
}

const categories: Category[] = [
  "food", "transport", "entertainment", "shopping", 
  "bills", "health", "education", "other"
]

export function AddExpenseForm({ onExpenseAdded }: AddExpenseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  
  const form = useForm<ExpenseForm>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      name: "",
      amount: "",
      category: "",
      description: ""
    }
  })

  const onSubmit = async (data: ExpenseForm) => {
    setIsSubmitting(true)
    
    try {
      const expense: Expense = {
        id: crypto.randomUUID(),
        name: data.name,
        amount: Number(data.amount),
        category: data.category as Category,
        date: new Date().toISOString(),
        description: data.description
      }

      storageUtils.addExpense(expense)
      onExpenseAdded(expense)
      
      form.reset()
      
      toast({
        title: "Expense added! 🐰",
        description: `Added ₹${expense.amount} for ${expense.name}`,
      })
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try adding your expense again",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <CuteCard variant="soft">
      <CuteCardHeader>
        <div className="flex items-center space-x-3">
          <MascotDisplay type="bunny" size="md" />
          <div className="flex-1">
            <CuteCardTitle>Add New Expense</CuteCardTitle>
            <SpeechBubble variant="bunny" className="mt-2 text-xs">
              Let&apos;s track this spending together! 🐰✨
            </SpeechBubble>
          </div>
        </div>
      </CuteCardHeader>
      
      <CuteCardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Expense Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What did you buy?</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Coffee, groceries, movie tickets..."
                      className="rounded-full border-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How much?</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        ₹
                      </span>
                      <Input 
                        type="number"
                        placeholder="0"
                        className="rounded-full border-2 pl-8"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-full border-2">
                        <SelectValue placeholder="Pick a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          <div className="flex items-center space-x-2">
                            <span>{categoryEmojis[category]}</span>
                            <span className="capitalize">{category}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description (Optional) */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Any extra details..."
                      className="rounded-full border-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CuteButton 
              type="submit" 
              variant="bunny" 
              size="lg" 
              className="w-full mt-6"
              disabled={isSubmitting}
            >
              <Plus className="w-4 h-4 mr-2" />
              {isSubmitting ? "Saving..." : "Save & Hug 🐰"}
            </CuteButton>
          </form>
        </Form>
      </CuteCardContent>
    </CuteCard>
  )
}