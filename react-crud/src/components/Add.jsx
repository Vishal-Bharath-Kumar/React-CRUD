import { useState } from "react";
import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { API_URL } from "../constants/EndPoint";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

const Add = () => {
  const [movieName, setMovieName] = useState("");
  const [actorName, setActorName] = useState("");
  
  const addMovie = async() =>{
    try{
        const existingMovies = await axios.get(API_URL);
        const nextId = existingMovies.data.id + 1;
        const data={
            id:nextId,
            title: movieName,
            actor: actorName
          }
        const response = await axios.post(API_URL,data);
        console.log(data);
        console.log(response);
        toast.success("Movie Added Successfully");
        window.location.reload();
    }catch(error){
        console.log("Error posting data")
        toast.error("Sorry Error Occured")
    }
  }
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Add</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Add Movies</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Make changes to your movie list.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Movie Name
              </Text>
              <TextField.Input
                placeholder="Enter movie name"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Actor Name
              </Text>
              <TextField.Input
                placeholder="Enter actor name"
                value={actorName}
                onChange={(e) => setActorName(e.target.value)}
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={()=>addMovie()}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
      <ToastContainer />
    </>
  );
};

export default Add;
