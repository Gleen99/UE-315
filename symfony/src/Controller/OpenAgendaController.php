<?php

namespace App\Controller;

use App\Service\OpenAgendaService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class OpenAgendaController extends AbstractController
{
    private $openAgendaService;

    public function __construct(OpenAgendaService $openAgendaService)
    {
        $this->openAgendaService = $openAgendaService;
    }
    public function searchEvents(Request $request, string $id): JsonResponse
    {
        $idArray = explode(',', $id);

        $data = json_decode($request->getContent(), true);

        $categories = $request->query->get('categories') ?? ($data['categories'] ?? []);
        if (!is_array($categories)) {
            $categories = explode(',', $categories);
        }
        $keyword = $request->query->get('keyword') ?? ($data['keyword'] ?? null);
        $oaq = $request->query->get('oaq') ?? ($data['oaq'] ?? null);
        $includeFields = $request->query->get('includeFields') ?? ($data['includeFields'] ?? []);
        if (!is_array($includeFields)) {
            $includeFields = explode(',', $includeFields);
        }

        $timeframe = $request->query->get('timeframe') ?? ($data['timeframe'] ?? null);
        $timingsgte = $request->query->get('timings[gte]') ?? ($data['timings[gte]'] ?? null);
        $timingslte = $request->query->get('timings[lte]') ?? ($data['timings[lte]'] ?? null);
        $uid = $request->query->get('uid') ?? ($data['uid'] ?? null);
        $sort = $request->query->get('sort') ?? ($data['sort'] ?? null);
        $relative = $request->query->get('relative') ?? ($data['relative'] ?? []);
        if (!is_array($relative)) {
            $relative = explode('_', $relative);
        }
        $aggs['1']['k'] = $request->query->get('aggs[1][k]') ?? ($data['aggs[1][k]'] ?? null);
        $aggs['1']['t'] = $request->query->get('aggs[1][t]') ?? ($data['aggs[1][t]'] ?? null);

        $searchParams = [
            'categories' => $categories,
            'keyword' => $keyword,
            'oaq' => $oaq,
            'includeFields' => $includeFields,
            'timeframe' => $timeframe,
            'timings[gte]' => $timingsgte,
            'timings[lte]' => $timingslte,
            'uid' => $uid,
            'sort' => $sort,
            'includeLabels'=>[''],
            'relative' => $relative,
            'aggs[1][k]' => 'categories',
            'aggs[1][t]' => 'af',
        ];

        $responses = [];

        foreach ($idArray as $id) {
            $events = $this->openAgendaService->getEvents($searchParams, $this->getDoctrine()->getManager(), $id);
            $responses[$id] = $events;
        }

        return new JsonResponse($responses);
    }




    public function getAgendas(): JsonResponse
    {
        $agendas = $this->openAgendaService->getAgendas($this->getDoctrine()->getManager());

        return new JsonResponse($agendas);
    }
}
