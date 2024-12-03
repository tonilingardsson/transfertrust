# **TransferTrust**  
A decentralized application (dApp) for secure verification and transfer of real assets, utilizing blockchain technology for transparency, efficiency, and trust. This is my final project for my remote studies as a Blockchain Developer at Medie Institutet, Stockholm.

## **Overview**  
TransferTrust aims to streamline ownership transfers of assets like vehicles, real estate, and equipment by:  
- Providing immutable records of asset conditions.  
- Ensuring secure and transparent transactions between parties.  
- Reducing reliance on intermediaries and minimizing disputes.  

## **Features**  
- **Asset Verification**: Generate and share detailed asset status reports.  
- **Ownership Transfer**: Smart contract-based ownership transfers on the blockchain.  
- **Blockchain Integration**: Powered by Moralis and Solidity for secure and scalable interactions.  
- **User-Friendly Interface**: React-based front-end for seamless user experience.  

## **Tech Stack**  
- **Front-End**: React.js  
- **Smart Contracts**: Solidity  
- **Blockchain Framework**: Moralis  
- **Testing**: Hardhat  
- **Deployment**: Netlify (front-end), Moralis (smart contracts)  
- **Storage**: IPFS (optional for asset documentation)  

## **Installation**  
1. Clone the repository:  
   Run:
-     git clone https://github.com/tonilingardsson/transfertrust.git  
-     cd TransferTrust
3. Install dependencies:
Run:
-     npm install
5. Start the development server:
Run:
-     npm run dev

## **Usage**
Register or log in using a Web3 wallet (e.g., MetaMask).
Initiate an asset verification process.
Transfer ownership securely via smart contracts.

## **Roadmap**
- Complete project planning and design.
- Develop the React front-end.
- Implement smart contracts in Solidity.
- Integrate Moralis for blockchain interaction.
- Test and deploy the application.

## **License**
This project is licensed under the MIT License. See the LICENSE file for details.

## **Acknowledgments**
- **Moralis**: For providing excellent blockchain integration tools.
- **OpenZeppelin**: For reusable smart contract libraries.
- **Minima Global Team**: For guidance and recommendations during the project development phase.

## **User Stories & Acceptance Criteria**

**User Story 1: Register a Car**
As a car owner, I want to register my car on the blockchain,
so that potential buyers can verify its status and history.

**Acceptance Criteria 1:**
The car registration form should include fields for car details (e.g., make, model, year, VIN, and mileage).
On submission, the details are securely stored on the blockchain.
A unique identifier (e.g., token ID) is generated for the registered car.
The user receives a confirmation message after successful registration.
An error message is shown if required fields are missing or if registration fails.

**User Story 2: Update Car Status**
As a car owner, I want to update my car's status (e.g., mileage, repair history),
so that buyers can access accurate, up-to-date information.

**Acceptance Criteria 2:**
Users must authenticate ownership of the car before making updates.
The form should allow updates to specific fields (e.g., mileage, recent repairs).
Updated data is recorded on the blockchain and linked to the car's unique ID.
A transaction confirmation is displayed upon successful update.
Unauthorized update attempts are blocked.

**User Story 3: Verify Car History**
As a potential buyer, I want to verify a car's history using its unique identifier,
so that I can make an informed purchase decision.

**Acceptance Criteria 3:**
Users can input the car's unique ID or VIN to search its history.
The app retrieves and displays details such as registration date, mileage, and repair history.
Data retrieved should be tamper-proof and verifiable via the blockchain.
An error message is displayed if the car ID does not exist.

**User Story 4: Transfer Ownership**
As a car seller, I want to transfer ownership of my car to a buyer,
so that the new owner gains full control over the car's blockchain record.

**Acceptance Criteria 4:**
Both parties must sign the transaction digitally (multi-signature support).
Ownership transfer requires approval from the current owner and buyer.
The new owner's wallet address replaces the current owner’s.
A blockchain confirmation is displayed after successful transfer.
An error message is shown for incomplete or unauthorized transfers.

**User Story 5: Authenticate Users**
As a dApp user, I want to authenticate securely,
so that I can access features based on my role (owner, buyer, admin).

**Acceptance Criteria 5:**
Users can log in using their blockchain wallet (e.g., MetaMask or similar).
Only authenticated users can perform actions like registration, updates, or transfers.
Unauthorized access attempts are logged and denied.
Session timeouts are enforced for added security.

**User Story 6: Generate Certificates**
As a car owner, I want to generate a blockchain-backed status certificate for my car,
so that I can share it with buyers as proof of its condition.

**Acceptance Criteria 6:**
Users can request a digital certificate summarizing the car's history.
Certificates are digitally signed and timestamped via the blockchain.
A PDF or QR code version of the certificate is available for download.
Verification of the certificate is possible through the app.
