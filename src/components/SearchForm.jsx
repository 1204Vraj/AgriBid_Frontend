"use client"
import PropTypes from "prop-types"
import { useForm } from "react-hook-form"
import Input from "./ui/Input"
import Button from "./ui/Button"

const regions = [
  "All Regions",
  "North",
  "South",
  "East",
  "West",
  "Central",
  "Northeast",
  "Northwest",
  "Southeast",
  "Southwest",
]

const SearchForm = ({ onSearch, isSearching }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      cropName: "",
      region: "All Regions",
    },
  })

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-semibold mb-4">Search Auctions</h2>

      <form onSubmit={handleSubmit(onSearch)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Crop Name" placeholder="Enter crop name..." {...register("cropName")} />

          <div className="form-group">
            <label htmlFor="region" className="form-label">
              Region
            </label>
            <select
              id="region"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("region")}
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" isLoading={isSearching}>
            Search Auctions
          </Button>
        </div>
      </form>
    </div>
  )
}

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool,
}

export default SearchForm
