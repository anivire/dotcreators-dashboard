import { ArtistProfile } from '@/utils/models/ArtistProfile';
import { ArtistTrend } from '@/utils/models/ArtistTrend';
import classNames from 'classnames';
import { FC } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import RiArrowDownSFill from '~icons/ri/arrow-down-s-fill';
import RiEqualFill from '~icons/ri/equal-fill';

interface Props {
  artistInfo: ArtistProfile;
  trendData: ArtistTrend[];
  trendBy: 'followers' | 'tweets';
  height?: number;
  bgColor?: string;
}

export const ArtistListCardTrendGraph: FC<Props> = props => {
  function getArtistTrendValueRaw(): number | undefined {
    if (props.trendBy === 'followers') {
      return props.artistInfo.weeklyFollowersGrowingTrend;
    }

    if (props.trendBy === 'tweets') {
      return props.artistInfo.weeklyPostsGrowingTrend;
    }
  }

  function getArtistValue(): string {
    return props.trendBy + 'Count';
  }

  function getTrendDifference(trendBy: 'followers' | 'tweets'): number {
    const selectedData =
      trendBy === 'followers'
        ? props.trendData.map(data => data.followersCount)
        : props.trendData.map(data => data.tweetsCount);

    if (selectedData.length < 2) return 0;

    const trendDifference =
      selectedData[selectedData.length - 1] - selectedData[0];

    return trendDifference;
  }

  function getStrokeColor(): string {
    const trendValueRaw = getArtistTrendValueRaw();

    if (trendValueRaw === undefined) {
      return '#a1a1aa';
    }

    const trendValue = parseFloat(trendValueRaw.toFixed(3));

    if (trendValue === 0.0) {
      return '#a1a1aa';
    }

    return trendValue > 0 ? '#a3e635' : '#FA4545';
  }

  function getGetGradientType(): number {
    const trendValueRaw = getArtistTrendValueRaw();

    if (trendValueRaw === undefined) {
      return 0;
    }

    const trendValue = parseFloat(trendValueRaw.toFixed(3));

    if (trendValue === 0.0) {
      return 0;
    }

    return trendValue > 0 ? 1 : 2;
  }

  return (
    <div
      className={classNames(
        'relative flex w-full flex-col gap-5 rounded-2xl p-5',
        props.bgColor,
        { 'bg-dot-tertiary/50': !props.bgColor }
      )}
    >
      <p className="text-sm text-zinc-400">
        {props.trendBy.charAt(0).toUpperCase() + props.trendBy.slice(1)} growing
        trend
      </p>
      <ResponsiveContainer
        key={props.artistInfo.userId + props.trendBy}
        width="100%"
        height={props.height ? props.height : 200}
      >
        <AreaChart
          data={props.trendData}
          margin={{ top: 0, right: 30, left: 0, bottom: -10 }}
        >
          <defs>
            <linearGradient
              id={getArtistValue() + props.artistInfo.userId + props.trendBy}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={getStrokeColor()}
                stopOpacity={0.8}
              />
              <stop offset="95%" stopColor={getStrokeColor()} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="recordedAt"
            strokeOpacity={0.1}
            tickFormatter={(value: string) =>
              new Date(value).toLocaleDateString('en-EN', {
                month: 'long',
                day: 'numeric',
              })
            }
          />
          <YAxis strokeOpacity={0.1} />
          <CartesianGrid strokeOpacity={0.1} />
          <Tooltip
            contentStyle={{
              color: '#A1A1AA',
              backgroundColor: '#303030',
              border: 'none',
            }}
            itemStyle={{
              color: '#FDFDFD',
            }}
            labelFormatter={(value: string) =>
              new Date(value).toLocaleDateString()
            }
            formatter={(value: number, name: string, props: any) => [
              value,
              getArtistValue() === 'followersCount' ? 'Followers' : 'Tweets',
              props,
            ]}
            separator=": "
          />
          <Area
            type="bump"
            dataKey={getArtistValue()}
            stroke={getStrokeColor()}
            strokeWidth={3}
            fillOpacity={0.5}
            fill={`url(#${getArtistValue() + props.artistInfo.userId + props.trendBy})`}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex flex-row items-center justify-between gap-5">
        <p className="text-sm text-zinc-400">Last 7d</p>
        <div className="flex flex-row items-center gap-5">
          <p className="leading text-xl font-bold">
            {getTrendDifference(props.trendBy) > 0
              ? '+' + getTrendDifference(props.trendBy)
              : getTrendDifference(props.trendBy)}
          </p>
          <h1
            className={classNames(
              'flex flex-row items-center gap-1 rounded-lg p-2 px-4 text-base font-bold',
              {
                'bg-zinc-400/10 text-zinc-400': getGetGradientType() === 0,
                'bg-[#a3e635]/10 text-[#a3e635]': getGetGradientType() === 1,
                'bg-[#FA4545]/10 text-[#FA4545]': getGetGradientType() === 2,
              }
            )}
          >
            {getArtistTrendValueRaw() === 0 ? (
              <RiEqualFill />
            ) : (
              <RiArrowDownSFill
                className={classNames({
                  'rotate-180': getArtistTrendValueRaw()! > 0,
                })}
              />
            )}
            {props.trendBy === 'followers'
              ? props.artistInfo.weeklyFollowersGrowingTrend &&
                Math.round(
                  Math.abs(props.artistInfo.weeklyFollowersGrowingTrend) * 100
                ) / 100
              : props.artistInfo.weeklyPostsGrowingTrend &&
                Math.round(
                  Math.abs(props.artistInfo.weeklyPostsGrowingTrend) * 100
                ) / 100}
            %
          </h1>
        </div>
      </div>
    </div>
  );
};
