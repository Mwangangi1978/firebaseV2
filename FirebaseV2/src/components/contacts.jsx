import  { useState, useEffect } from 'react';
import { auth, db } from "../config/firebase";
import {signOut} from "firebase/auth";
import { useNavigate } from 'react-router-dom';


import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import {
    Box,
    Button,
    Container,
    Heading,
    Input,
    Flex,
    useToast,
  } from '@chakra-ui/react';

export default function Contacts() {
    const navigate = useNavigate();
    const toast = useToast();
    const [data, setData] = useState({
        name: '',
        email: '',
        number: ''
    });
    const [contacts, setContacts] = useState([]);
    const [showOverlay, setShowOverlay] = useState(false);
    const [editContactId, setEditContactId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const dataSnapshot = await getDocs(collection(db, "contacts"));
        setContacts(dataSnapshot.docs.map((item) => ({ ...item.data(), id: item.id })));
    }

    const handleInputs = (event) => {
        let { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        addDoc(collection(db, "contacts"), {
            name: data.name,
            email: data.email,
            number: parseInt(data.number)
        })
            .then(() => {
                alert('Data sent');
                fetchData();
                setShowOverlay(false);
                setData({ name: '', email: '', number: '' });
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const handleEdit = (id) => {
        const contactToEdit = contacts.find(contact => contact.id === id);
        setData({ ...contactToEdit });
        setEditContactId(id);
        setShowOverlay(true);
    };

    const handleUpdate = () => {
        const dataToUpdate = doc(db, "contacts", editContactId);
        updateDoc(dataToUpdate, { ...data })
            .then(() => {
                alert("Data updated");
                fetchData();
                setShowOverlay(false);
                setData({ name: '', email: '', number: '' });
                setEditContactId(null);
            })
            .catch((err) => {
                alert(err);
            });
    };

    const deleteData = (id) => {
        const dataToDelete = doc(db, 'contacts', id);
        deleteDoc(dataToDelete)
            .then(() => {
                alert("Data Deleted");
                fetchData();
            })
            .catch((err) => {
                alert(err);
            });
    }
    const logout = async () => {
        try {
          await signOut(auth);
          toast({
            title: 'Success',
            description: 'Signed out successfully. Bye!.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
           // Redirect if successful
           navigate('/'); 
        } catch (err) {
          console.error(err);
          toast({
            title: 'Error',
            description: 'There was an error signing out. Please try again later.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
    }

    return (
        <Container w={"100vw"} mt="2" ml={"350px"} h={"100vh"}>
        <Flex justify="space-between" align="center" mb="10">
          <Flex justify="space-around" align="center" >
            <Heading size="xl">CONTACTS</Heading>
            <Button colorScheme="teal" onClick={() => setShowOverlay(true)}>
                Add Contact
            </Button>
          </Flex>
          <Button colorScheme="teal" alignSelf={'center'} onClick={logout}>
            Sign Out
           </Button>
        </Flex>
        {contacts.map((contact) => (
          <Box
            key={contact.id}
            bg="gray.100"
            borderWidth="1px"
            borderRadius="lg"
            p="4"
            mb="4"
          >
            <p>{contact.name}</p>
            <p>{contact.email}</p>
            <p>{contact.number}</p>
            <Flex justify="flex-end">
              <Button onClick={() => handleEdit(contact.id)} mr="2" colorScheme='yellow'>
                Edit
              </Button>
              <Button onClick={() => deleteData(contact.id)} colorScheme='red'>Delete</Button>
            </Flex>
          </Box>
        ))}
        {showOverlay && (
          <Box
            bg="rgba(0, 0, 0, 0.9)"
            pos="fixed"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            p="4"
            borderRadius="lg"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.3)"
            zIndex="1000"
            w="300px"
          >
            <Input
              type="text"
              name="name"
              placeholder="name"
              value={data.name}
              onChange={handleInputs}
              mb="2"
              color={"white"}
            />
            <Input
              type="email"
              name="email"
              placeholder="email"
              value={data.email}
              onChange={handleInputs}
              mb="2"
              color={"white"}
            />
            <Input
              type="tel"
              name="number"
              placeholder="number"
              value={data.number}
              onChange={handleInputs}
              mb="2"
              color={"white"}
            />
            {editContactId !== null ? (
              <Button colorScheme="teal" onClick={handleUpdate} mr="2">
                Update
              </Button>
            ) : (
              <Button colorScheme="teal" onClick={handleSubmit} mr="2">
                Add
              </Button>
            )}
            <Button
              colorScheme="red"
              onClick={() => {
                setShowOverlay(false);
                setData({ name: '', email: '', number: '' });
                setEditContactId(null);
              }}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Container>
    );
}
