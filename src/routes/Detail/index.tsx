import useMermaidEffect from "./hooks/useMermaidEffect"
import PostDetail from "./PostDetail"
import PageDetail from "./PageDetail"
import usePostQuery from "src/hooks/usePostQuery"
import SearchInput from "src/routes/Feed/SearchInput"
import { FeedHeader } from "src/routes/Feed/FeedHeader"
import Footer from "src/routes/Feed/Footer"
import styled from "@emotion/styled"
import TagList from "src/routes/Feed/TagList"
import MobileProfileCard from "src/routes/Feed/MobileProfileCard"
import ProfileCard from "src/routes/Feed/ProfileCard"
import ServiceCard from "src/routes/Feed/ServiceCard"
import ContactCard from "src/routes/Feed/ContactCard"
import PostList from "src/routes/Feed/PostList"
import PinnedPosts from "src/routes/Feed/PostList/PinnedPosts"
const HEADER_HEIGHT = 73
import { useState } from "react"
import { useRouter } from "next/router"

type Props = {}

const Detail: React.FC<Props> = () => {
  const data = usePostQuery()
  useMermaidEffect()
    const [q, setQ] = useState("")
    const router = useRouter()
    const currentTag = router.query.tag || undefined

  if (!data) return null

  return (
    <StyledWrapper data-type={data.type}>
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
        <SearchInput value={q} onChange={(e) => setQ(e.target.value)} />
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
    </StyledWrapper>
  )
}

export default Detail


const StyledWrapper = styled.div`
  grid-template-columns: repeat(12, minmax(0, 1fr));

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
    grid-column: span 12 / span 12;

    @media (min-width: 1024px) {
      grid-column: span 10 / span 10;
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
`


