import React, {useEffect, useState} from 'react'
import {Header} from '../components/header'
import api from "../generic-services/api";
import {useParams} from "react-router-dom";
import Chart from "react-apexcharts";
import {FilePicker} from "../components/file-picker";
import {Button} from "@mui/material";
import DeleteDialog from "../components/delete-dialog";


export default function DepartmentSettings() {
  const [data,setData] = useState(null)
  const {id} = useParams();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [opt2, setOpt2] = useState({
    chart: {
      width: 380,
      type: 'donut',
    },
    plotOptions: {
      pie: {
        expandOnClick : true,
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
    colors:['#00FF00','#FF0000'],
    labels: ['Presents', 'Absents'],
    legend: {
      show:false
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  })
  const [series, setSeries] = useState(null)
  const [isOpen, setIsOpen] = useState(false);

  let handleClose = () => {
    setIsOpen(!isOpen);
  }

  const updateImage = (files) => {
    api.execute('/api/departments/'+id, 'put', {
      "imageUrl": files[0].publicUrl
    }).then(res=> {
      getDepartment();
    }).catch( e => {
          console.log(e)
      }
    )
  }

  const updateDepartment = (e) => {
    e.preventDefault();
    api.execute('/api/departments/'+id, 'put', {
      "description": description,
    }).then(res=> {
      getDepartment();
    }).catch( e => {
          console.log(e)
      }
    )
  }

  const getDepartment = () => {
    api.execute('/api/departments/'+id).then(res => {
        setData(res.data)
        setName(res.data.name)
        setDescription(res.data.description);
        setImageUrl(res.data.imageUrl)
      }
    ).catch(e=> console.log(e))
  }

  const deleteDepartment = () => {

  }

  useEffect(()=>{
    getDepartment();
    api.execute(`/api/stats/department/${id}/attendance-stats`)
        .then(res => setSeries([res.data.present,res.data.total-res.data.present]))
        .catch(e => console.log(e))
  },[])

  return (
      <div>
        <Header/>
        {isOpen &&
            <FilePicker accept={true} open={isOpen} close={handleClose} fileReturn={updateImage}/>
        }
        {
          <main className="mt-10">
            <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-9 lg:divide-y-0 lg:divide-x">

                  <form className="divide-y divide-gray-200 lg:col-span-9" onSubmit={updateDepartment}>
                    {/* Profile section */}
                    <div className="py-6 px-4 sm:p-6 lg:pb-8">


                      <div>
                        <h2 className="text-lg leading-6 font-medium text-[#6366F1] font-semibold">Department Details</h2>
                        <p className="mt-1 text-sm text-gray-500">
                          This information will be displayed publicly so be careful what you share.
                        </p>
                      </div>

                      <div className="mt-6 flex flex-col lg:flex-row">
                        <div className="flex-grow space-y-6">
                          <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                              Department Name
                            </label>
                            <div className="mt-1 rounded-md shadow-sm flex">
                              <input
                                  type="text"
                                  name="classname"
                                  id="classname"
                                  autoComplete="classname"
                                  className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 bg-gray-100"
                                  value={name}
                                  onChange={event => setName(event.target.value)}
                                  disabled={true}
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                              Department Name
                            </label>
                            <div className="mt-1 rounded-md shadow-sm flex">
                              <input
                                  type="text"
                                  name="classname"
                                  id="classname"
                                  autoComplete="classname"
                                  className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                  value={description}
                                  onChange={event => setDescription(event.target.value)}
                              />
                            </div>
                          </div>

                        </div>

                        <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                          <p className="text-sm font-medium text-gray-700" aria-hidden="true">
                            Photo
                          </p>
                          <div className="mt-1 lg:hidden" onClick={() => {setIsOpen(!isOpen)}}>
                            <div className="flex items-center">
                              <div
                                  className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                                  aria-hidden="true"
                              >
                                <img className="rounded-full h-full w-full" src={imageUrl} alt="" />
                              </div>
                              <div className="ml-5 rounded-md shadow-sm">
                                <div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                  <label
                                      htmlFor="mobile-user-photo"
                                      className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                                  >
                                    <span>Change</span>
                                    <span className="sr-only"> user photo</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="hidden relative rounded-full overflow-hidden lg:block" onClick={() => {setIsOpen(!isOpen)}}>
                            <img className="relative rounded-full w-40 h-40" src={imageUrl} alt="" />
                            <label
                                htmlFor="desktop-user-photo"
                                className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                            >
                              <span>Change</span>
                              <span className="sr-only"> user photo</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Privacy section */}
                    <div className="pt-6 divide-y divide-gray-200">


                      <div className="mt-4 py-4 px-4 flex justify-between sm:px-6">
                        <div>
                          <DeleteDialog actionDone={deleteDepartment}>
                            <Button variant={"outlined"} color={"error"}>Delete</Button>
                          </DeleteDialog>
                        </div>
                        <div>
                          <button
                              type="button"
                              className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                          >
                            Cancel
                          </button>
                          <button
                              type="submit"
                              className="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h2 className="text-lg leading-6 font-medium text-[#6366F1] font-semibold">Department Stats</h2>
                        { series &&
                            <div className="mt-4">
                              <div className="flex flex-col justify-center items-center mb-1">
                                <div id="chart" className="min-h-[270px]">
                                  <Chart options={opt2} series={series} type="donut" width={380}/>
                                </div>
                                <h1 className="font-semibold mb-6">Department's Aggregated Attendances</h1>
                              </div>
                            </div>
                        }
                      </div>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </main>
        }

      </div>
  )
}
