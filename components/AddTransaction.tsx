"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { transactionSchema, type TransactionType } from "@/utils/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addTransaction } from "@/actions/customers"

interface Props {
  customerId: string
  type: "credit" | "debit"
  onClose: () => void
}

export default function AddTransaction({ customerId, type, onClose }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionType>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      customerId,
      type,
      amount: 0,
      description: "",
    },
  })

  const onSubmit = async (data: TransactionType) => {
    setIsSubmitting(true)
    const result = await addTransaction(data)
    setIsSubmitting(false)
    if (result.success) {
      onClose()
    } else {
      // Handle error
      console.error(result.error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Add {type === "credit" ? "Credit" : "Debit"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label htmlFor="amount">Amount</Label>
            <Input type="number" {...register("amount", { valueAsNumber: true })} />
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
          </div>
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Input {...register("description")} />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : `Add ${type}`}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

