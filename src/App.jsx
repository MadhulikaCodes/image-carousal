import React, { useEffect, useState } from 'react'

const App = () => {
  const [data,setData]=useState([]);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const [index,setIndex] = useState(0);
  const fetchData= async() => {
   try{
     setLoading(true);
    const url = 'https://www.reddit.com/r/aww/top/.json?t=all';
    const res =await fetch(url);

    if(!res.ok){
      setLoading(false);
      setError("error in fetching data");
    }
    const res1=await res.json();
    const list = res1.data.children
      .filter((item) => item.data.url_overridden_by_dest.includes(".jpg"))
      .map((item) => item.data.url_overridden_by_dest);
    setLoading(false);
    setData(list);
    console.log(list,"list");
   }
   catch(error){
    setError("error in fetching data");
    setLoading(false);
   }
  }
  useEffect(()=>{
    fetchData();
  },[])
  useEffect(()=>{
    const interval=setInterval(()=>{
      setIndex((index) => (index + 1) % data.length);
  console.log(data[index])
    },4000)
  return ()=>{
    clearInterval(interval);
  }
  },[data])
  const handlePrev=()=>{
    setIndex((index)=>(index-1+data.length)%data.length)
  }
  const handleNext=()=>{
    setIndex((index)=>(index+1)%data.length)
  }
  return (
    <>
      {!loading && (
        <div className="container">
          <h1 className="heading">Image Carousel</h1>
          <div className="carousal">
            <button className="btn" onClick={handlePrev}>
              prev
            </button>
            <img src={data[index]} />
            <button lassName="btn" onClick={handleNext}>
              next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App