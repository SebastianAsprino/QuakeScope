import { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "primereact/chart";
import { Chart as ChartJS, LineElement, LinearScale, PointElement, CategoryScale, Title, Tooltip, Legend } from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import "./Grid.css";

// Register the necessary Chart.js components and the annotation plugin
ChartJS.register(LineElement, LinearScale, PointElement, CategoryScale, Title, Tooltip, Legend, annotationPlugin);

export const Grid = ({ planetEnv }) => {
  const [planet, setPlanet] = useState(planetEnv ? planetEnv : "Moon");
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [pos, setPos] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://exotic-carree-systemgroup-2baf159e.koyeb.app/json")
      .then(response => {
        const data = response.data;
        if (data && typeof data === 'object') {
          const posArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            name: value
          }));
          setPos(posArray);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = "#FFFFFF";
    const textColorSecondary = "#FFFFFF";
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          tension: 0.4,
        }
      ],
    };

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
        annotation: {
          annotations: []
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
      animation: false,
    };

    setChartData(data);
    setChartOptions(options);
    setLoading(false); // Data fetched, loading complete
  }, []);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    setLoading(true); // Start loading on selection change
    axios.get("https://exotic-carree-systemgroup-2baf159e.koyeb.app/json/" + e.target.value)
      .then(response => {
        const data = response.data;
        if (data && typeof data === 'object') {
          const posArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            name: value
          }));
          setPos(posArray);
        }
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = "#FFFFFF";
        const textColorSecondary = "#FFFFFF";
        const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
        const dataf = {
          labels: data.time,
          datasets: [
            {
              label: "First Dataset",
              data: data.vel,
              fill: false,
              borderColor: documentStyle.getPropertyValue("--blue-500"),
              tension: 0.4,
            }
          ],
        };

        const options = {
          maintainAspectRatio: false,
          aspectRatio: 0.6,
          scales: {
            x: {
              ticks: {
                color: textColorSecondary,
              },
              grid: {
                color: surfaceBorder,
              },
            },
            y: {
              ticks: {
                color: textColorSecondary,
              },
              grid: {
                color: surfaceBorder,
              },
            },
          },
          plugins: {
            annotation: {
              annotations: [
                {
                  type: 'line',
                  mode: 'vertical',
                  scaleID: 'x',
                  value: data.sismo_start,
                  borderColor: 'red',
                  borderWidth: 2,
                  label: {
                    content: 'Sismo Start',
                    enabled: true,
                    position: 'top'
                  }
                },
                {
                  type: 'line',
                  mode: 'vertical',
                  scaleID: 'x',
                  value: data.sismo_end,
                  borderColor: 'red',
                  borderWidth: 2,
                  label: {
                    content: 'Sismo End',
                    enabled: true,
                    position: 'top'
                  }
                }
              ]
            }
          }
        };

        setChartData(dataf);
        setChartOptions(options);
        setLoading(false); // Data fetched, loading complete
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false); // Error occurred, loading complete
      });
  };

  return (
    <section className="mx-40">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      {!loading && (
        <div>
          <section className="flex flex-col justify-center rounded-xl bg-black/40 w-[60rem]">
            <Chart type="line" data={chartData} options={chartOptions} />
            <label className="select" htmlFor="slct">
              <select id="slct" value={selectedOption} onChange={handleSelectChange} required>
                <option value="" disabled>
                  Select option
                </option>
                {pos.length > 0 ? (
                  pos.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.id}
                    </option>
                  ))
                ) : (
                  <option disabled>No options available</option>
                )}
              </select>
              <svg>
                <use xlinkHref="#select-arrow-down"></use>
              </svg>
            </label>

            <svg className="sprites">
              <symbol id="select-arrow-down">
                <polyline points="1 1 5 5 9 1"></polyline>
              </symbol>
            </svg>
          </section>
        </div>
      )}
    </section>
  );
};

export default Grid;
