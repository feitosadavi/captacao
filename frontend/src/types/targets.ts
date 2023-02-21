export type Progress = {
  current: number,
  total: number
}

export type TargetOptions = {
  progress: Progress,
  selected: boolean
}

export type TargetKeys = 'olx' | 'webmotors' | 'icarros'

export type Target = Record<TargetKeys, TargetOptions>
