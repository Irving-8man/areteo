import { VictoryHistogram } from 'victory';


export default function ChartVictory() {
    return (
        <VictoryHistogram
        data={[
          { x: 1 },
          { x: 2 },
          { x: 2 },
          { x: 4 },
          { x: 4 },
          { x: 5 }
        ]}
      />
    )
}