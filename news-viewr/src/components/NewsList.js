import React, { useEffect,useState } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import Axios from "axios";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const sampleArticle = {
  title: "제목",
  description: "내용",
  url: "https://google.com",
  urlToImage: "https://via.placeholder.com/160"
};

const NewsList = () => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
      const fetchData = async() =>{
          setLoading(true);
          try{
              const response = await Axios.get(
                'https://newsapi.org/v2/top-headlines?country=kr&apiKey=f464059e71d34b509815cb7cdd3bacc3',
              );
              setArticles(response.data.articles);
          } catch(e){
              console.log(e);
          }
          setLoading(false);
      };
      fetchData();
  },[]);

 if(loading){
     return <NewsListBlock>대기 중...</NewsListBlock>;
 }
 if(!articles){
     return null;
 } 
 return(
    <NewsListBlock>
        {articles.map(article=>(
            <NewsItem key={article.url} article = {article}/>
        ))}
    </NewsListBlock>    
 )
};
export default NewsList;