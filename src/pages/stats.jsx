import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";
import api from "../generic-services/api";
import {useNavigate, useParams} from "react-router-dom";

export default function Stats() {
  const navigate = useNavigate()
  let {id} = useParams();
  useEffect(() => {
    api.execute('/api/class/' + id + '/role')
      .then(res => {
        if (res.data === 'Student') navigate(-1)
      })
      .catch(e => console.log(e))
  })
  const [options, setOptions] = useState({
    chart: {
      height: 390,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          }
        }
      }
    },
    labels: ['Assessments', 'Posts', 'Attendance', 'Polls'],
    legend: {
      show: true,
      floating: true,
      fontSize: '12px',
      position: 'left',
      offsetX: 0,
      offsetY: 1,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 2
      },
      formatter: function (seriesName, opts) {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
      },
      itemMargin: {
        vertical: 0
      }
    },
    responsive: [{
      breakpoint: 420,
      chart: {
        width: 300,
      },
      options: {
        legend: {
          show: true,
          offsetX: +50
        }
      }
    }
]  });
  const [opt2, setOpt2] = useState({
    chart: {
      width: 380,
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270
      }
    },
    dataLabels: {
      enabled: true
    },
    fill: {
      type: 'gradient',
    },
    colors: ['#00FF00', '#FF0000'],
    labels: ['Presents', 'Absents'],
    legend: {
      show: false
    },
    responsive: [{
      breakpoint: 420,
      options: {
        chart: {
          width: 300
        },
        legend: {
          show: false
        }
      }
    }]
  })
  const [opt3, setOpt3] = useState({
    chart: {
      width: 380,
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270
      }
    },
    dataLabels: {
      enabled: true
    },
    fill: {
      type: 'gradient',
    },
    // colors:['#00FF00','#FF0000'],
    labels: ['Post Comments', 'Poll Comments', 'Assessment Comments'],
    legend: {
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex]
      }
    },
    responsive: [{
      breakpoint: 420,
      options: {
        chart: {
          width: 300
        },
        legend: {
          show:false
        }
      }
    }]
  })
  const [series, setSeries] = useState(null)
  const [series2, setSeries2] = useState(null)
  const [series3, setSeries3] = useState(null)

  useEffect(() => {
    api.execute('/api/stats/class/' + id + '/general-stats')
      .then(res => {
        const d = res.data;
        console.log(res.data)
        setSeries([d.assessments, d.posts, d.attendances, d.polls])
      })
      .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    api.execute('/api/stats/class/' + id + '/attendance-stats')
      .then(res => {
        const d = res.data;
        setSeries2([d.total_presents, d.total_attendances - d.total_presents])
      })
      .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    api.execute('/api/stats/class/' + id + '/comments-stats')
      .then(res => {
        const d = res.data;
        setSeries3([d.post_comments, d.poll_comments, d.assessment_comments])
      })
      .catch(e => console.log(e))
  }, [])
  return (
    <div>
    <h1 className="text-lg font-bold mt-2 text-[#6366F1]">CLASS STATS</h1>

    <div className="mt-12 app min-h-[90vh] h-full flex flex-row flex-wrap justify-center lg:space-x-24 max-w-screen-2xl m-auto">
      {series &&
      <div className="flex flex-col justify-center items-center">
        <div className="mixed-chart min-h-[270px] pt-0">
          <Chart options={options} series={series} type="radialBar" width={400}/>
        </div>
        <h1 className="mb-12">Class Post Details</h1>
      </div>
      }

      {series2 &&
      <div className="flex justify-center items-center flex-col">
        <div id="chart" className="min-h-[270px]">
          <Chart options={opt2} series={series2} type="donut" width={380}/>
        </div>
        <h1 className="mt-5 mb-12">Class' aggregated Attendance</h1>

      </div>
      }

      {series3 &&
      <div className="flex justify-center items-center flex-col">
        <div id="chart" className="min-h-[270px]">
          <Chart options={opt3} series={series3} type="donut" width={480}/>
        </div>
        <h1 className="mt-5 mb-12">Class Comments Stats</h1>
      </div>
      }

    </div>
    </div>
  );
}
