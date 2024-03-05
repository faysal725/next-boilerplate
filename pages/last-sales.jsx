import React, { useEffect, useState } from "react";
import useSWR from "swr";

export default function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);
  const { data, error } = useSWR(
    "https://nextjs-course-c0984-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );


  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      console.log(data, "asdfsdf");
      setSales(transformedSales);
    }
  }, [data]);

  if (error) {
    return <p>No data yet</p>;
  }

  if (!data && !sales) {
    return <p>Loading ....</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch("https://nextjs-course-c0984-default-rtdb.firebaseio.com/sales.json")
  const data = await response.json()
  
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      return { props: { sales: transformedSales }, revalidate: 10 };
    
}
