import { useRouter } from "next/router"
import { useState } from "react"
import useMermaidEffect from "./hooks/useMermaidEffect"
import PostDetail from "./PostDetail"
import PageDetail from "./PageDetail"
import usePostQuery from "src/hooks/usePostQuery"
import { FeedHeader } from "src/routes/Feed/FeedHeader"
import Footer from "src/routes/Feed/Footer"
import styled from "@emotion/styled"
import TagList from "src/routes/Feed/TagList"
import MobileProfileCard from "src/routes/Feed/MobileProfileCard"
import PostList from "src/routes/Feed/PostList"
import PinnedPosts from "src/routes/Feed/PostList/PinnedPosts"
import ProfileCard from "src/routes/Feed/ProfileCard"
import ServiceCard from "src/routes/Feed/ServiceCard"
import ContactCard from "src/routes/Feed/ContactCard"
const HEADER_HEIGHT = 73

type Props = {}
const Detail: React.FC<Props> = () => {
  const data = usePostQuery()
  useMermaidEffect()
  const [q, setQ] = useState("")
  const router = useRouter()
  const currentTag = router.query.tag || undefined

  if (!data) return null

  return (
    <StyledWrapper
      data-type={data.type}
      className={currentTag ? "show-rt" : ""}
    >
      <div
        className="lt"
        css={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <TagList />
      </div>
      <div className="mid">
        <MobileProfileCard />
        <PinnedPosts q={q} />
        <div className="tags">
          <TagList />
        </div>
        <FeedHeader />
        {currentTag ? (
          <PostList q={q} /> // 显示标签相关的内容
        ) : (
          <>
            {data.type[0] === "Page" && <PageDetail />}
            {data.type[0] !== "Page" && <PostDetail />}
          </>
        )}
        <div className="footer">
          <Footer />
        </div>
      </div>
      {currentTag && (
        <div
          className="rt"
          css={{
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          }}
        >
          <ProfileCard />
          <ServiceCard />
          <ContactCard />
          <div className="footer">
            <Footer />
          </div>
        </div>
      )}
    </StyledWrapper>
  )
}


export default Detail
const StyledWrapper = styled.div`
  grid-template-columns: repeat(15, minmax(0, 1fr));

  padding: 2rem 0;
  display: grid;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: block;
    padding: 0.5rem 0;
  }

  > .lt {
    display: none;
    overflow: scroll;
    position: sticky;
    grid-column: span 2 / span 2;
    top: ${HEADER_HEIGHT - 10}px;

    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    @media (min-width: 1024px) {
      display: block;
    }
  }

  > .mid {
    grid-column: span 13 / span 13;

    @media (min-width: 1024px) {
      grid-column: span 13 / span 13;
    }

    > .tags {
      display: block;

      @media (min-width: 1024px) {
        display: none;
      }
    }

    > .footer {
      padding-bottom: 2rem;
      @media (min-width: 1024px) {
        display: none;
      }
    }
  }

  > .rt {
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    display: none;
    overflow: scroll;
    position: sticky;
    top: ${HEADER_HEIGHT - 10}px;

    @media (min-width: 1024px) {
      display: block;
      grid-column: span 3 / span 3;
    }

    .footer {
      padding-top: 1rem;
    }
  }

  &.show-rt {
    > .rt {
      display: block;
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(15, minmax(0, 1fr));
      > .mid {
        grid-column: span 10 / span 10;
      }
    }
  }
`
