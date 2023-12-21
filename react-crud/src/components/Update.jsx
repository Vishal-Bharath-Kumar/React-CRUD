import { useState } from "react";
import { Dialog, Flex, Text, Button, TextField } from "@radix-ui/themes";
import { UpdateIcon } from "@radix-ui/react-icons";
import { API_URL } from "../constants/EndPoint";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Update = (props) => {
  // eslint-disable-next-line react/prop-types
  const{id,title,actor} = props;
  const [movieName, setMovieName] = useState("");
  const [actorName, setActorName] = useState("");

  const updateMovie = async () => {
    const data={
      title: movieName,
      actor: actorName
    }
    try{
      const response = await axios.put(API_URL+"/"+id,data);
      console.log(response);
      window.location.reload();
      toast.success("Updated Successfully")
    }catch(error){
      console.log("Error Updating Movie",error)
      toast.error("Sorry Error Occured")
    }
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <UpdateIcon className="update-icon"></UpdateIcon>
        </Dialog.Trigger>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Update Movies</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Make changes to your movie list.
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Movie Name
              </Text>
              <TextField.Input placeholder="Enter movie name" defaultValue={title}
              onChange={(e) => setMovieName(e.target.value)} />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Actor Name
              </Text>
              <TextField.Input placeholder="Enter actor name" defaultValue={actor} 
              onChange={(e) => setActorName(e.target.value)}/>
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button onClick={()=>updateMovie()}>Save</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
      <ToastContainer />
    </>
  );
};

export default Update;
