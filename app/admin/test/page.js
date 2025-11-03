'use client';

import { useState } from 'react';
import client, { databases, storage, DATABASE_ID, BLOGS_COLLECTION_ID, STORAGE_BUCKET_ID } from '@/lib/appwrite';

export default function TestAppwritePage() {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    const testResults = {};

    try {
      // Test 1: Check client configuration
      const projectId = client.config.project;
      const endpoint = client.config.endpoint;
      testResults.client = {
        success: true,
        message: `Connected to project: ${projectId}`,
        endpoint: endpoint
      };
    } catch (error) {
      testResults.client = {
        success: false,
        message: `Client error: ${error.message}`
      };
    }

    // Test 2: Check environment variables
    try {
      const envVars = {
        DATABASE_ID,
        BLOGS_COLLECTION_ID,
        STORAGE_BUCKET_ID
      };
      
      const missingVars = Object.entries(envVars)
        .filter(([key, value]) => !value || value.includes('your_') || value.includes('_here'))
        .map(([key]) => key);

      if (missingVars.length > 0) {
        testResults.env = {
          success: false,
          message: `Missing or invalid environment variables: ${missingVars.join(', ')}`
        };
      } else {
        testResults.env = {
          success: true,
          message: 'All environment variables are configured',
          values: envVars
        };
      }
    } catch (error) {
      testResults.env = {
        success: false,
        message: `Environment error: ${error.message}`
      };
    }

    // Test 3: Try to access database
    if (testResults.env?.success) {
      try {
        await databases.listDocuments(DATABASE_ID, BLOGS_COLLECTION_ID);
        testResults.database = {
          success: true,
          message: 'Successfully connected to database and collection'
        };
      } catch (error) {
        testResults.database = {
          success: false,
          message: `Database error: ${error.message}`,
          hint: 'Check that Database ID and Collection ID are correct in .env file'
        };
      }

      // Test 4: Try to access storage
      try {
        await storage.listFiles(STORAGE_BUCKET_ID);
        testResults.storage = {
          success: true,
          message: 'Successfully connected to storage bucket'
        };
      } catch (error) {
        testResults.storage = {
          success: false,
          message: `Storage error: ${error.message}`,
          hint: 'Check that Storage Bucket ID is correct in .env file'
        };
      }
    }

    setResults(testResults);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Appwrite Configuration Test
          </h1>
          
          <p className="text-gray-600 mb-6">
            This page helps you verify that your Appwrite configuration is correct.
            Click the button below to run connectivity tests.
          </p>

          <button
            onClick={testConnection}
            disabled={loading}
            className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all shadow-lg disabled:opacity-50 mb-8"
          >
            {loading ? 'Testing...' : 'Run Tests'}
          </button>

          {Object.keys(results).length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Test Results</h2>
              
              {Object.entries(results).map(([test, result]) => (
                <div
                  key={test}
                  className={`p-4 rounded-lg border-2 ${
                    result.success
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`text-2xl ${result.success ? 'text-green-500' : 'text-red-500'}`}>
                      {result.success ? '✓' : '✗'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 capitalize mb-1">
                        {test} Test
                      </h3>
                      <p className="text-gray-700 mb-2">{result.message}</p>
                      {result.hint && (
                        <p className="text-sm text-gray-600 italic">
                          💡 {result.hint}
                        </p>
                      )}
                      {result.values && (
                        <div className="mt-2 text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">
                          {Object.entries(result.values).map(([key, value]) => (
                            <div key={key}>
                              {key}: {value}
                            </div>
                          ))}
                        </div>
                      )}
                      {result.endpoint && (
                        <p className="text-sm text-gray-600 mt-1">
                          Endpoint: {result.endpoint}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-500 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Next Steps:</h3>
                <ul className="list-disc list-inside text-blue-700 space-y-1">
                  {!results.env?.success && (
                    <li>Update your .env file with correct IDs from Appwrite Console</li>
                  )}
                  {!results.database?.success && (
                    <li>Create a database and blogs collection in Appwrite Console</li>
                  )}
                  {!results.storage?.success && (
                    <li>Create a storage bucket in Appwrite Console</li>
                  )}
                  {results.env?.success && results.database?.success && results.storage?.success && (
                    <li>✨ All tests passed! Visit /admin to start creating blogs</li>
                  )}
                </ul>
                <p className="mt-3 text-sm text-blue-600">
                  📚 See <code className="bg-blue-100 px-2 py-1 rounded">docs/APPWRITE_SETUP.md</code> for detailed setup instructions
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
