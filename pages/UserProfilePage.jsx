import React from 'react'

export default function UserProfilePage(props) {
  return (
    <h1>{props.username}</h1>
  )
}


export async function getServerSideProps(context){
  const {params} = context;
  
  return {
    props: {
      username: 'Max'
    }
  }
}