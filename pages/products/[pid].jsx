import React, { Fragment } from "react";

import fs from "fs/promises";
import path from "path";

export default function ProductDetailsPage(props) {
  const { loadedProduct } = props;

  
  if (!loadedProduct) {
    return <p>Loading...</p>
  }
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}


async function getData(){

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;
  const data = await getData()
  const product = data.products.find((product) => product.id === productId);
  if (!product) {
    return {notFound: true}
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
}



// this is for static page generation of next js. because this page is dynamic so next js doesnt know how many file will be created for this getStaticPaths() function used

export async function getStaticPaths() {
  const data = await getData()
  const ids = data.products.map(product => product.id);
  const pathsWithParams = ids.map((id) => ({params: {pid: id}}))
  return {
    paths: pathsWithParams,
    fallback: true,   //this tell next js if the path isnt match it should show 404 page or not 
  }
}

