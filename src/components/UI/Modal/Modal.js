import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const NewModal = (props) => {
    return (
        <div>
            <Modal size={props.size} show={props.show} onHide={props.handleClose}>
                   <Modal.Header closeButton>
                     <Modal.Title>{props.modalTitle}</Modal.Title>
                       </Modal.Header>
                        <Modal.Body>
                         {props.children}  
                        </Modal.Body>
                     <Modal.Footer>

                    {props.buttons ? props.buttons.map((btn,index)=>
                      <Button onClick={btn.onClick} key={index} variant={btn.color}>
                     {btn.label}
                      </Button>
                      ): <Button
                      style={{ backgroundColor: '#333'}}
                       variant="primary" 
                       {...props} 
                       className="btn-sm"
                        onClick={props.handleClose}
                        // onClick={props.props}
                        >
                      Save Changes
                      </Button>
                    }   
                  
                  </Modal.Footer>
                   </Modal>
        </div>
    );
};

export default NewModal;