import React from "react";
import Layout from "../../../components/Layout";
import ProjectCardsData from "../../../data/ProjectCardsData";
import { ProjectCard } from "../../../widgets/cards";
import { Button, Typography } from "@material-tailwind/react";
import { GrAdd } from "react-icons/gr";
import { useNavigate } from "react-router-dom";


const OrganizationPage = () => {

    const navigate = useNavigate()
    return (<div >

        <div className="flex justify-between mt-4">
            <Typography className="text-xl text-black font-bold">Projects</Typography>
            <Button className="flex gap-3 bg-[#6499E9]"><GrAdd />Create Project</Button>
        </div>

        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 mt-6">
            {ProjectCardsData.map(({ icon, title, footer, ...rest }) => (
                <ProjectCard
                onClick={()=>{
                    alert("ddd")
                    // navigate('/ProjectDetailsPage') 
                }}
                    key={title}
                    {...rest}
                    title={title}
               

                />
            ))}
        </div>
    </div>)
}

export default Layout(OrganizationPage);