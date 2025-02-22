

export interface ReelState {
  id: number;
  title: string;
  video: string;
  description: string;
  user: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReelWrapperState {
  reelData: ReelState[];
  loading: boolean;
  error: string | null;
}
