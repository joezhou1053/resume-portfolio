import React, { useState } from 'react';
import { ChevronLeft, Edit3, ChevronDown, ChevronUp } from 'lucide-react';

const AssetTransferApp = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({});
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    // Basic Information
    initiator: "John D.",
    dateOfInitiation: "03-06-2025",
    formNo: "AT2025060300236",
    mode: "Mode 1",
    ftSubprojectCode: "PROJ00017568",
    ftSubprojectName: "Project Alpha L21 F2 EP",
    dateOfAcceptance: "06-05-2025",
    
    // Financial Information
    amountOfFixedAssets: "***,***.**",
    materialSettlementAmountFT: "***,***.**",
    materialSettlementAmountDITO: "0",
    serviceSettlementAmount: "***,***.**",
    
    // Rates and Fees
    capitalizedInterestRate: "0",
    capitalizedInterestAmount: "0",
    tariffRate: "0",
    tariffAmount: "0",
    supervisionFeeRate: "0.000****1",
    supervisionFeeAmount: "***.**",
    siteSelectionFeeRate: "0.004****4",
    siteSelectionFeeAmount: "*,***.**",
    
    // Status Information
    statusInSAP: "Transfer posting success",
    resourceSystemStatus: "Completed",
    eoStatusInSAP: "Posting success"
  });

  const toggleSection = (sectionName) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderField = (label, value, field) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <div className="px-3 py-2 bg-white rounded-md text-gray-900 border border-gray-200">
          {value}
        </div>
      )}
    </div>
  );

  const renderSection = (title, fields, sectionKey) => (
    <div className="mb-6">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="w-full flex items-center justify-between text-lg font-semibold mb-4 text-gray-800 border-b pb-2"
      >
        <span>{title}</span>
        {collapsedSections[sectionKey] ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronUp className="w-5 h-5" />
        )}
      </button>
      {!collapsedSections[sectionKey] && (
        <div>
          {fields.map(({ label, value, field }) => 
            renderField(label, value, field)
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
        <ChevronLeft className="w-6 h-6" />
        <h1 className="text-lg font-semibold flex-1 text-center">Asset Transfer</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          <Edit3 className="w-5 h-5" />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('basic')}
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'basic'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Basic Information
          </button>
          <button
            onClick={() => setActiveTab('process')}
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'process'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Process Record
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'basic' && (
          <>
            {/* Basic Information Section */}
            {renderSection("Basic Information", [
              { label: "Initiator", value: formData.initiator, field: "initiator" },
              { label: "Date of Initiation", value: formData.dateOfInitiation, field: "dateOfInitiation" },
              { label: "Form No.", value: formData.formNo, field: "formNo" },
              { label: "Mode", value: formData.mode, field: "mode" },
              { label: "F&T Subproject Code", value: formData.ftSubprojectCode, field: "ftSubprojectCode" },
              { label: "F&T Subproject Name", value: formData.ftSubprojectName, field: "ftSubprojectName" },
              { label: "Date of Acceptance", value: formData.dateOfAcceptance, field: "dateOfAcceptance" }
            ], "basic")}

            {/* Financial Information Section */}
            {renderSection("Financial Information", [
              { label: "Amount of Fixed Assets", value: formData.amountOfFixedAssets, field: "amountOfFixedAssets" },
              { label: "Material Settlement Amount-F&T", value: formData.materialSettlementAmountFT, field: "materialSettlementAmountFT" },
              { label: "Material Settlement Amount-DITO", value: formData.materialSettlementAmountDITO, field: "materialSettlementAmountDITO" },
              { label: "Service Settlement Amount", value: formData.serviceSettlementAmount, field: "serviceSettlementAmount" }
            ], "financial")}

            {/* Rates and Fees Section */}
            {renderSection("Rates and Fees", [
              { label: "Capitalized Interest Rate", value: formData.capitalizedInterestRate, field: "capitalizedInterestRate" },
              { label: "Capitalized Interest Amount", value: formData.capitalizedInterestAmount, field: "capitalizedInterestAmount" },
              { label: "Tariff Rate", value: formData.tariffRate, field: "tariffRate" },
              { label: "Tariff Amount", value: formData.tariffAmount, field: "tariffAmount" },
              { label: "Supervision Fee Rate", value: formData.supervisionFeeRate, field: "supervisionFeeRate" },
              { label: "Supervision Fee Amount", value: formData.supervisionFeeAmount, field: "supervisionFeeAmount" },
              { label: "Site Selection Fee Rate", value: formData.siteSelectionFeeRate, field: "siteSelectionFeeRate" },
              { label: "Site Selection Fee Amount", value: formData.siteSelectionFeeAmount, field: "siteSelectionFeeAmount" }
            ], "rates")}

            {/* Status Information Section */}
            {renderSection("Status Information", [
              { label: "Status in SAP", value: formData.statusInSAP, field: "statusInSAP" },
              { label: "Resource System Status", value: formData.resourceSystemStatus, field: "resourceSystemStatus" },
              { label: "EO Status in SAP", value: formData.eoStatusInSAP, field: "eoStatusInSAP" }
            ], "status")}

            {/* Action Buttons */}
            <div className="flex mt-8 mb-4">
              <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-600 transition-colors">
                Approve/Endorse
              </button>
            </div>
          </>
        )}

        {activeTab === 'process' && (
          <div className="text-center py-8">
            <div className="text-gray-500 text-lg mb-4">Process Record</div>
            <div className="text-gray-400">Process records will be displayed here</div>
          </div>
        )}
      </div>

      {/* Edit Mode Indicator */}
      {isEditing && (
        <div className="fixed bottom-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
          Edit Mode
        </div>
      )}
    </div>
  );
};

export default AssetTransferApp;