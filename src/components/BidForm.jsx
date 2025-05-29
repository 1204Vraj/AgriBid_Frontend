"use client"
import PropTypes from "prop-types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Input from "./ui/Input"
import Button from "./ui/Button"

const BidForm = ({ auctionId, currentBid, basePrice, onSubmit, isSubmitting }) => {
  // Minimum bid: ₹10 more than currentBid, or basePrice if no bids
  const minimumBid = currentBid && currentBid > 0 ? currentBid + 10 : basePrice

  // Zod schema
  const bidSchema = z.object({
    amount: z
        .number({
          invalid_type_error: "Bid must be a number",
          required_error: "Bid amount is required",
        })
        .min(minimumBid, `Bid must be at least ₹${minimumBid.toFixed(2)}`)
        .positive("Bid must be a positive number"),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(bidSchema),
    defaultValues: {
      amount: minimumBid,
    },
  })

  const submitBid = async (data) => {
    const success = await onSubmit({
      auctionId,
      amount: data.amount,
    })

    if (success) {
      reset({
        amount: data.amount + 10,
      })
    }
  }

  return (
      <div className="card bg-green-50 border border-green-100">
        <h3 className="text-lg font-medium mb-4">Place Your Bid</h3>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Current highest bid:
            <span className="font-bold ml-1">
            {typeof currentBid === "number" && currentBid > 0 ? `₹${currentBid.toFixed(2)}` : "No bids yet"}
          </span>
          </p>
          <p className="text-sm text-gray-600">
            Minimum bid:
            <span className="font-bold ml-1">₹{minimumBid.toFixed(2)}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(submitBid)}>
          <Input
              type="number"
              label="Your Bid Amount (₹)"
              {...register("amount", {
                valueAsNumber: true,
              })}
              error={errors.amount?.message}
          />

          <Button type="submit" variant="primary" className="w-full mt-2" isLoading={isSubmitting}>
            Place Bid
          </Button>
        </form>
      </div>
  )
}

BidForm.propTypes = {
  auctionId: PropTypes.string.isRequired,
  currentBid: PropTypes.number,
  basePrice: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
}

export default BidForm
