import React from 'react';
import './Loader.css';
import PuffLoader from "react-spinners/PuffLoader";


export default function Loader() {
  return (
    <div className="Loading-header">
        <PuffLoader
          size={'200px'}
          color={"#3BB2FF"}
          loading={true}
        />
      </div>
  )
}