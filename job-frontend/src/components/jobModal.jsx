import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createJob } from '../api/service'
import styled , {keyframes} from 'styled-components';
import { useNavigate } from 'react-router-dom';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const ModalWrapper = styled(Modal)`
  max-width: 500px;
  width: 90%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 0 auto;
  width: 100% !important;
  position: absolute;
  top: 20px;
  left : 30%
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: black;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled.button`
  padding: 10px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #5a6268;
  }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: ${spin} 2s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;


const JobModal = (props) => {
  const [modalIsOpen, setIsOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [rate, setRate] = useState('');
  const [date, setDate] = useState(new Date());
  const { closeModal } = props

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    const payload = { title, rate, jobDate :date };
    try {
      await createJob(payload);
      
      closeModal();  // Close the modal on successful submission
      window.location.reload()
      
    } catch (error) {
      console.error('Error creating job:', error);
    } finally{
        setLoading(false)
    }
  };

  return (
    <div>
      <ModalWrapper
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        overlayClassName={Overlay}
        contentLabel="Create Job"
      >
        <Header>Create Job</Header>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder='Enter job title'
            />
          </FormGroup>
          <FormGroup>
            <Label>Rate</Label>
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              required
              placeholder='Enter rate'
            />
          </FormGroup>
          <FormGroup>
            <Label>Job Date</Label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              required
            />
          </FormGroup>
          <SubmitButton type="submit">
          Submit
          </SubmitButton>
          <CancelButton type="button" onClick={closeModal}>Cancel</CancelButton>
          { loading ? <Loader/>: null }
        </Form>
      </ModalWrapper>
    </div>
  );
};

export default JobModal;