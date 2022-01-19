type UpdatesProps = {
  cover_url: string;
  title: string;
  update_time: string;
  update_to: string;
};

type DailyAnimeProps = {
  date: string;
  day_of_week: string;
  is_today: boolean;
  updates: UpdatesProps[];
};

type ContextProps = {
  loading: boolean;
  setLoading: Function;
};

export type { UpdatesProps, DailyAnimeProps, ContextProps };
