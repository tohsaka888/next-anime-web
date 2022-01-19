import { ResultProps } from "../../components/Result/type";

type VideoListProps = {
  info: string;
  name: string;
  player: string;
};

type PlaylistProps = {
  name: string;
  num: 2;
  video_list: VideoListProps[];
};

type AnimeDetailProps = ResultProps & {
  play_lists: PlaylistProps[];
};

export type { VideoListProps, PlaylistProps, AnimeDetailProps };
