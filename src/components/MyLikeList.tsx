import PicThumbnail from "./PicThumbnail";
import ReactPaginate from "react-paginate";
import module from "./css/MyLikeList.module.css"
import { useState } from "react";

export default function MyLikeList(props:{picList:[], handlePicClick:any, totalPage:number, isLoading:boolean}){
    
    const {picList,handlePicClick,totalPage,isLoading} = props;
    const [currentPage, setCurrentPage] = useState(0)

    const handlePageClick = (event: { selected: number }) => {
      setCurrentPage(event.selected);
    };
    
    return(
        picList.length > 0 ? (
            <>
            {picList.slice(currentPage*8, currentPage*8+8).map((l: { id: string; url: string }) => (
              <div onClick={handlePicClick} key={l.id} id={l.id}>
                <PicThumbnail url={l.url} />
              </div>
            ))}
  
  <div className={module["pagination-wrapper"]}>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={2}
                  marginPagesDisplayed={1}
                  initialPage={0}
                  pageCount={isLoading ? 0 : Math.ceil(totalPage/8)}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                  activeClassName={module["active-page"]}
                  className={module.pagination}
                />
              </div> 
  
            </>
          ) : (
            <p
              style={{
                fontWeight: "700",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "2em",
              }}
            >
              {" "}
              No pics yet
            </p>
          )
    )
}