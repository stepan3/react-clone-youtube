import React from 'react'
import { Image } from 'semantic-ui-react'
import { Video } from '../../../../../store/types'
import { formatShortString } from '../../../../../utils/number'
import { formatTimeString } from '../../../../../utils/timeformat'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import './VideoPreview.css'

TimeAgo.addLocale(en)

const timeAgo: TimeAgo = new TimeAgo()

interface IVideoPreview {
  video: Video
  isVertical?: boolean
}

export const VideoPreview = ({ video, isVertical }: IVideoPreview) => {
  const infoClass: string = isVertical ? 'verticalList' : 'video_info'

  return (
    <div className="video_preview">
      <div className="video_image">
        <Image src={video.snippet?.thumbnails?.medium?.url} />
        <div className="video_timestamp">
          <span>
            {!video.contentDetails
              ? null
              : formatTimeString(video.contentDetails?.duration!)}
          </span>
        </div>
      </div>
      <div className={infoClass}>
        <div className="video_info_title">{video.snippet?.title}</div>
        <div className="video_basic_info">
          <div className="video_channel">{video.snippet?.channelTitle}</div>
          <div className="video_view_time">
            {!video.statistics
              ? null
              : `${formatShortString(video.statistics?.viewCount!)}{' '}
            views • ${timeAgo.format(new Date(video.snippet?.publishedAt!))}`}
          </div>
          {isVertical && <div>{video.snippet?.description}</div>}
        </div>
      </div>
    </div>
  )
}
