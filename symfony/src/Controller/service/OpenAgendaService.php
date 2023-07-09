<?php

namespace App\Service;

use Symfony\Component\HttpClient\HttpClient;
use App\Entity\Cle;
use Doctrine\ORM\EntityManagerInterface;

class OpenAgendaService
{
    private $baseUrl;

    public function __construct(string $baseUrl)
    {
        $this->baseUrl = $baseUrl;

    }
    public function getAgendas(EntityManagerInterface $entityManager): array
    {
        try {
            $cleRepository = $entityManager->getRepository(Cle::class);

            $cles = [];
            $agenda_uids = [];
            $id = [];


            $clesEntities = $cleRepository->findAll();
            foreach ($clesEntities as $cleEntity) {
                $cles[] = $cleEntity->getApi();
                $agenda_uids[] = $cleEntity->getUid();
                $id[$cleEntity->getUid()] = $cleEntity->getId();
            }
            $client = HttpClient::create();

            $url = $this->baseUrl . '?key=' . implode('&', $cles) . '&uid[]=' . implode('&uid[]=', $agenda_uids);
            $response = $client->request('GET', $url);

            if ($response->getStatusCode() != 200) {
                throw new \Exception("Erreur lors de l'appel à l'API. Statut : " . $response->getStatusCode());
            }

            $resultats = json_decode($response->getContent(), true);

            $tmp = [];
            foreach ($resultats['agendas'] as $resultat) {
                $resultat['id'] = $id[$resultat['uid']];
                $tmp['agendas'][] = $resultat;
            }

            return $tmp;

        } catch (\Exception $e) {
            return [
                'error' => true,
                'message' => 'Une erreur est survenue lors de la récupération des agendas : ' . $e->getMessage(),
            ];
        }
    }

    public function getEvents(array $searchParams, EntityManagerInterface $entityManager, string $id): array
    {
        try {
            $cleRepository = $entityManager->getRepository(Cle::class);
            $cle = $cleRepository->find($id);

            $cles = $cle->getApi();
            $agenda_uid = $cle->getUid();

            $params = [];

            if (array_key_exists('categories', $searchParams)) {
                $params['categories'] = $searchParams['categories'];
            }
            if (array_key_exists('keyword', $searchParams)) {
                $params['search'] = $searchParams['keyword'];
            }
            if (array_key_exists('oaq', $searchParams)) {
                $params['oaq[from]'] = $searchParams['oaq'];
            }
            if (array_key_exists('includeFields', $searchParams)) {
                $params['includeFields'] = $searchParams['includeFields'];
            }
            if (array_key_exists('timings', $searchParams)) {
                $params['timings'] = $searchParams['timings'];
            }
            if (array_key_exists('timings[gte]', $searchParams)) {
                $params['timings']['gte'] = $searchParams['timings[gte]'];
            }
            if (array_key_exists('timings[lte]', $searchParams)) {
                $params['timings']['lte'] = $searchParams['timings[lte]'];
            }
            if (array_key_exists('uid', $searchParams)) {
                $params['uid'] = $searchParams['uid'];
            }
            if (array_key_exists('relative', $searchParams)) {
                $params['relative'] = $searchParams['relative'];
            }
            if (array_key_exists('includeLabels', $searchParams)) {
                $params['includeLabels'] = $searchParams['includeLabels'];
            }
            if (array_key_exists('sort', $searchParams)) {
                $params['sort'] = $searchParams['sort'];
            }
            if (array_key_exists('aggs[1][k]', $searchParams)) {
                $params['aggs[1][k]'] = $searchParams['aggs[1][k]'];
            }
            if (array_key_exists('aggs[1][t]', $searchParams)) {
                $params['aggs[1][t]'] = $searchParams['aggs[1][t]'];
            }

            if (array_key_exists('timeframe', $searchParams)) {
                $today = new \DateTime();

                switch($searchParams['timeframe']) {
                    case 'this_week':
                        $startOfWeek = (clone $today)->modify('this week');
                        $endOfWeek = (clone $today)->modify('this week +6 days');
                        $params['timings']['gte'] = $startOfWeek->format('Y-m-d');
                        $params['timings']['lte'] = $endOfWeek->format('Y-m-d');
                        break;
                    case 'this_weekend':
                        $startOfNextWeek = (clone $today)->modify('this week');
                        $startOfWeekend = (clone $startOfNextWeek)->modify('Saturday');
                        $endOfWeekend = (clone $startOfNextWeek)->modify('Sunday');
                        $params['timings']['gte'] = $startOfWeekend->format('Y-m-d');
                        $params['timings']['lte'] = $endOfWeekend->format('Y-m-d');
                        break;
                    case 'this_month':
                        $startOfMonth = (clone $today)->modify('first day of this month');
                        $endOfMonth = (clone $today)->modify('last day of this month');
                        $params['timings']['gte'] = $today->format('Y-m-d');
                        $params['timings']['lte'] = $endOfMonth->format('Y-m-d');
                        break;
                    case 'next_month':
                        $startOfNextMonth = (clone $today)->modify('first day of next month');
                        $endOfNextMonth = (clone $today)->modify('last day of next month');
                        $params['timings']['gte'] = $startOfNextMonth->format('Y-m-d');
                        $params['timings']['lte'] = $endOfNextMonth->format('Y-m-d');
                        break;
                }

            }

            $client = HttpClient::create();

            $response = $client->request('GET', $this->baseUrl.'/'.$agenda_uid.'/events?key='.$cles, [
                'query' => $params,
            ]);

            if ($response->getStatusCode() != 200) {
                throw new \Exception("Erreur lors de l'appel à l'API. Statut : " . $response->getStatusCode());
            }

            $result = json_decode($response->getContent(), true);
            $events = $result['events'] ?? [];

            if (empty($events)) {
                $aggregations = $result['aggregations'] ?? [];
                $tmp = [
                    'success' => true,
                    'total' => 0,
                    'events' => [],
                    'aggregations' => $aggregations,
                ];
            } else {
                $tmp = [
                    'success' => true,
                    'total' => count($events),
                    'events' => $events,
                    'aggregations' => $result['aggregations'],
                ];
            }

            return $tmp;

        } catch (\Exception $e) {
            return [
                'error' => true,
                'message' => 'Une erreur est survenue lors de la récupération des événements : ' . $e->getMessage(),
            ];
        }

    }
}
