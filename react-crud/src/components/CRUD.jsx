import { useState, useEffect } from "react";
import axios from "axios";
import {API_URL} from '../constants/EndPoint.js'
import { Table, TableCell, TableColumnHeaderCell} from "@radix-ui/themes";
import {TrashIcon} from '@radix-ui/react-icons'
import { ToastContainer, toast } from 'react-toastify';
import Add from "./Add.jsx";
import Update from "./Update.jsx";


const CRUD = () => {
  const [data, setData] = useState([]);

  const deleteUser = async (id) => {
    try{
      const response = await axios.delete(API_URL+"/" + id);
      console.log("Response:", response);
      fetchData();
      toast.success("Deleted Successfully")
    }catch(error){
      console.log("Error Deleting Data :",error);
      toast.error("Sorry Error Occured")
    }
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
    } catch (error){
      console.error("Error fetcing movie data :", error);
      toast.error("Sorry Error Occured")
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <h1>Movies List</h1>
      <div className="add-button">
        <Add/>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>S.No</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Movie Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actor Name</Table.ColumnHeaderCell>
            <TableColumnHeaderCell>Update</TableColumnHeaderCell>
            <TableColumnHeaderCell>Delete</TableColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((item, i) => (
            <Table.Row key={i}>
              <Table.RowHeaderCell>{i+1}</Table.RowHeaderCell>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.actor}</Table.Cell>
              <TableCell>
                <Update id={item.id}
                        title={item.title} 
                        actor={item.actor}/>
              </TableCell>
              <TableCell>
                <TrashIcon className="delete-icon" onClick={()=> deleteUser(item.id)}></TrashIcon>
              </TableCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <ToastContainer />
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default CRUD;
