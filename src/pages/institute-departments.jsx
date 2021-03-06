import React, {useEffect} from "react";
import Card from '../components/card';
import {Header} from "../components/header";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Button} from "@mui/material";
import placeholder from '../department.jpeg'
import AddDepartmentDialog from "../components/add-department-dialog";
import {useDispatch, useSelector} from "react-redux";
import {getDepartmentsInInstitute} from "../redux/actions/institute-actions";

export function InstituteDepartments() {
  const location = useLocation();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const data = location.state?.data;
  let {id} = useParams();

  let departments = useSelector((state => state.departments))

  useEffect(() => {
    dispatch(getDepartmentsInInstitute(id, navigate));
  }, [])

  return (
    <React.Fragment>
      <div className="min-w-[310px]">
        <Header isSideBarEnabled={false}/>
        <div className="mx-2 md:mx-16 flex flex-col md:px-8 xl:px-0">
          <main className="flex-1">
            <div className="flex justify-center">
              <div className="px-6 py-6 lg:w-5/6 max-w-[1500px]">

                <div className="px-4 sm:px-6 md:px-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl lg:text-2xl text-gray-900 font-bold">{data?.name}</h2>
                      <p className="text-xs text-gray-600">(Note:You are only entitled to see stats and update departments'
                        settings)</p>
                    </div>
                    <div className="flex">
                      <div>
                        <AddDepartmentDialog/>
                        <Link to={location.pathname + "/settings"}>
                          <Button variant='contained' size='small'>Stats & Settings</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <h1 className="mt-6 text-xl lg:text-2xl text-gray-800 font-medium mt-2">Departments</h1>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {departments.length &&
                    departments.map(item => (
                      <Card classId={item.id} className="mx-auto" key={item.id}
                            pathname={'/department/' + item.id + '/settings'}
                            image={item.imageUrl ?? placeholder}
                            classname={item.name || item.class}
                            classsection={item.section} classdetails={item?.institute?.name}
                      />
                    ))}

                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  )
}
