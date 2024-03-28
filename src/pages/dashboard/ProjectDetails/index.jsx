import React from "react";
import Layout from "../../../components/Layout";
import ProjectCardsData from "../../../data/ProjectCardsData";
import { ProjectCard } from "../../../widgets/cards";
import { Button, Typography } from "@material-tailwind/react";
import { GrAdd } from "react-icons/gr";


const ProjectDetailsPage = () => {

    return (<div >

        <div className="flex justify-between mt-4">
            <Typography className="text-xl text-black font-bold">Project 01</Typography>
            <Button className="flex gap-3 bg-[#6499E9]"><GrAdd />Add Module
            </Button>
        </div>

        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 mt-6">

        </div>
    </div>)
}

export default Layout(ProjectDetailsPage);