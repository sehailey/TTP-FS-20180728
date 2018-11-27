import React from 'react'

const SearchForm = props => {
  const { handleSubmit, handleChange, symbol } = props
  return (
    <form className="form-inline" onSubmit={handleSubmit}>
      <input
        className="form-control mr-sm-2"
        type="search"
        value={symbol}
        onChange={handleChange}
        id="symbol"
        placeholder="Search"
        aria-label="Search"
      />
      <button type="submit" className="btn btn-outline-success my-2 my-sm-0">
        Search
      </button>
    </form>
  )
}
export default SearchForm
