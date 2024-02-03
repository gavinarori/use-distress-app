import React, { useEffect, useState } from 'react';
import { Layer, Rectangle, ResponsiveContainer, Sankey, Text, Tooltip } from "recharts";

interface OffenseData {
    attributes: {
        OFFENSE: string;
        
    }
}
interface CustomLinkProps {
  sourceX: number;
  targetX: number;
  sourceY: number;
  targetY: number;
  sourceControlX: number;
  targetControlX: number;
  linkWidth: number;
  index: number;
}

class CustomLink extends React.Component<CustomLinkProps, { fill: string }> {
  state = {
      fill: "url(#linkGradient)",
  };

  render() {
      const {
          sourceX,
          targetX,
          sourceY,
          targetY,
          sourceControlX,
          targetControlX,
          linkWidth,
          index,
      } = this.props;
      const { fill } = this.state;

      return (
          <Layer key={`CustomLink${index}`}>
              <path
                  d={`
                M${sourceX},${sourceY + linkWidth / 2}
                C${sourceControlX},${sourceY + linkWidth / 2}
                  ${targetControlX},${targetY + linkWidth / 2}
                  ${targetX},${targetY + linkWidth / 2}
                L${targetX},${targetY - linkWidth / 2}
                C${targetControlX},${targetY - linkWidth / 2}
                  ${sourceControlX},${sourceY - linkWidth / 2}
                  ${sourceX},${sourceY - linkWidth / 2}
                Z
              `}
                  fill={fill}
                  strokeWidth="0"
                  onMouseEnter={() => {
                      this.setState({ fill: "rgba(0, 136, 254, 0.5)" });
                  }}
                  onMouseLeave={() => {
                      this.setState({ fill: "url(#linkGradient)" });
                  }}
              />
          </Layer>
      );
  }
}

interface CustomNodeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
  payload: { name: string; value: number };
  containerWidth: number;
}

export function CustomNode(props: CustomNodeProps) {
  // Destructure props for clarity
  const { x, y, width, height, index, payload, containerWidth } = props;
  const isOut = x + width + 6 > containerWidth;

  return (
      <Layer key={`CustomNode${index}`}>
          <Rectangle
              x={x}
              y={y}
              width={width}
              height={height}
              fill="#5192ca"
              fillOpacity="1"
          />
          <text
              textAnchor={isOut ? "end" : "start"}
              x={isOut ? x - 6 : x + width + 6}
              y={y + height / 2}
              fontSize="14"
              stroke="#333"
          >
              {payload.name}
          </text>
          <text
              textAnchor={isOut ? "end" : "start"}
              x={isOut ? x - 6 : x + width + 6}
              y={y + height / 2 + 13}
              fontSize="12"
              stroke="#333"
              strokeOpacity="0.5"
          >
              {payload.value }
          </text>
      </Layer>
  );
}

const Snaky: React.FC = () => {
    const [sankeyData, setSankeyData] = useState<{ nodes: { name: string }[], links: { source: number, target: number, value: number }[] } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://maps2.dcgis.dc.gov/dcgis/rest/services/FEEDS/MPD/MapServer/8/query?where=1%3D1&outFields=OFFENSE,WARD,SHIFT&f=json');
                const data = await response.json();

                if (data && data.features) {
                    const offenses: string[] = data.features.map((feature: OffenseData) => feature.attributes.OFFENSE);
                    const totalCount: number = offenses.length;
                    const offenseCounts: { [key: string]: number } = offenses.reduce((acc: { [key: string]: number }, offense: string) => {
                        acc[offense] = (acc[offense] || 0) + 1;
                        return acc;
                    }, {});

                    const sankeyData = {
                        nodes: [
                            { name: "total Count" },
                            ...Object.keys(offenseCounts).map((offense: string) => ({ name: offense }))
                        ],
                        links: [
                            ...Object.values(offenseCounts).map((value: number, index: number) => ({
                                source: 0,
                                target: index + 1,
                                value: value
                            }))
                        ]
                    };

                    setSankeyData(sankeyData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!sankeyData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            <div className="flex h-[400px] items-center justify-center  ">
                <ResponsiveContainer width="100%" height="100%">
                    <Sankey
                        data={sankeyData}
                        node={(nodeProps) => (
                            <CustomNode {...nodeProps} containerWidth={960} />
                        )}
                        link={(linkProps) => <CustomLink {...linkProps} />}
                        width={960}
                        height={500}
                    >
                        <defs>
                            <linearGradient id="linkGradient">
                                <stop offset="0%" stopColor="rgba(0, 136, 254, 0.5)" />
                                <stop offset="100%" stopColor="rgba(0, 197, 159, 0.3)" />
                            </linearGradient>
                        </defs>
                        <Tooltip />
                    </Sankey>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Snaky;
