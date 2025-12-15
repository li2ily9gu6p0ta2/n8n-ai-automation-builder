import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Workflow template generator
function generateWorkflowFromPrompt(prompt: string, analysis: any) {
  const workflowId = `wf_${Date.now()}`;
  
  const nodes: any[] = [
    {
      parameters: {},
      id: 'trigger',
      name: 'Schedule Trigger',
      type: 'n8n-nodes-base.scheduleTrigger',
      typeVersion: 1,
      position: [250, 300],
    }
  ];

  const connections: any = {
    'Schedule Trigger': {
      main: [[{ node: 'AI Processor', type: 'main', index: 0 }]]
    }
  };

  // Add nodes based on analysis
  let xPos = 450;
  
  if (analysis.needsImageGeneration) {
    nodes.push({
      parameters: {
        prompt: '={{ $json.prompt }}',
        model: 'dall-e-3',
      },
      id: 'image_gen',
      name: 'Generate Image',
      type: 'n8n-nodes-base.openAi',
      typeVersion: 1,
      position: [xPos, 300],
      credentials: {
        openAiApi: {
          id: 'openai_cred',
          name: 'OpenAI Account',
        },
      },
    });
    xPos += 200;
  }

  if (analysis.needsVideoGeneration) {
    nodes.push({
      parameters: {
        operation: 'generateVideo',
        prompt: '={{ $json.videoPrompt }}',
      },
      id: 'video_gen',
      name: 'Generate Video',
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 1,
      position: [xPos, 300],
    });
    xPos += 200;
  }

  if (analysis.needsDataFetch) {
    nodes.push({
      parameters: {
        url: '={{ $json.apiUrl }}',
        method: 'GET',
      },
      id: 'fetch_data',
      name: 'Fetch Data',
      type: 'n8n-nodes-base.httpRequest',
      typeVersion: 1,
      position: [xPos, 300],
    });
    xPos += 200;
  }

  // Add AI processor node
  nodes.push({
    parameters: {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an automation assistant. Process the input and generate appropriate outputs.',
        },
        {
          role: 'user',
          content: `={{ $json.userPrompt || "${prompt}" }}`,
        },
      ],
    },
    id: 'ai_processor',
    name: 'AI Processor',
    type: 'n8n-nodes-base.openAi',
    typeVersion: 1,
    position: [xPos, 300],
    credentials: {
      openAiApi: {
        id: 'openai_cred',
        name: 'OpenAI Account',
      },
    },
  });

  return {
    id: workflowId,
    name: analysis.workflowName || 'AI Generated Workflow',
    nodes,
    connections,
    active: false,
    settings: {
      executionOrder: 'v1',
    },
    tags: ['ai-generated', 'automation'],
  };
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Analyze prompt with AI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an n8n workflow analyzer. Analyze the user's automation request and return a JSON object with:
          - workflowName: A descriptive name for the workflow
          - needsImageGeneration: boolean
          - needsVideoGeneration: boolean
          - needsDataFetch: boolean
          - schedule: cron expression if scheduled
          - apiServices: array of API services needed
          - description: Brief description of what the workflow does`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const analysis = JSON.parse(completion.choices[0].message.content || '{}');

    // Generate n8n workflow
    const workflow = generateWorkflowFromPrompt(prompt, analysis);

    // Here you would normally create the workflow in n8n using the n8n API
    // For now, we'll return the generated workflow structure
    
    return NextResponse.json({
      success: true,
      workflowId: workflow.id,
      workflowName: workflow.name,
      workflow,
      analysis,
      message: 'Workflow generated successfully! Deploy to your n8n instance.',
    });

  } catch (error: any) {
    console.error('Error building workflow:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to build workflow' },
      { status: 500 }
    );
  }
}
