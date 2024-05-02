import { useState } from 'react';
import { Box, Button, Input, List, ListItem, IconButton, useToast, Flex, Text } from '@chakra-ui/react';
import { FaTrash, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered.',
        description: "Please enter a task before adding.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Box p={4}>
      <Flex mb={4} justify="space-between">
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <Button onClick={addTask} ml={2} colorScheme="blue">Add Task</Button>
      </Flex>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center" p={2} bg={task.isCompleted ? 'green.100' : 'gray.100'}>
            <Text as={task.isCompleted ? 's' : 'span'}>{task.text}</Text>
            <Flex>
              <IconButton icon={<FaCheck />} onClick={() => toggleCompletion(task.id)} colorScheme={task.isCompleted ? 'green' : 'gray'} mr={2} />
              <IconButton icon={<FaTrash />} onClick={() => deleteTask(task.id)} colorScheme="red" />
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Index;